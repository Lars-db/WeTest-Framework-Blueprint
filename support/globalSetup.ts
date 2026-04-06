import fs from 'fs';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

async function globalSetup() {
  const ENV = process.env.ENV || 'tst';
  const globalEnvPath = `support/environment/.env.global`;
  const envPath = `support/environment/.env.${ENV}`;

  // Load global config first (if exists)
  if (fs.existsSync(globalEnvPath)) {
    console.log(`Loading global environment file: ${globalEnvPath}`);
    dotenv.config({ path: globalEnvPath });
  } else {
    console.warn(`WARNING! Global environment file not found: ${globalEnvPath}.`);
  }

  // Then load environment-specific on top (overrides global)
  if (fs.existsSync(envPath)) {
    console.log(`Loading environment-specific file: ${envPath}`);
    dotenv.config({ path: envPath });
  } else {
    console.warn(`WARNING! Environment file not found: ${envPath}.`);
  }

  const userJsonPath = 'tests/.auth/user.json';
  if (fs.existsSync(userJsonPath)) {
    fs.rmSync(userJsonPath);
    console.log(`Global setup: Removed ${userJsonPath}`);
  }

  console.log('Global setup: Starting environment initialization...');

  // Check if Docker is running
  try {
    execSync('docker info', { stdio: 'pipe' });
    console.log('Global setup: Docker is running.');
  } catch {
    throw new Error('Global setup: Docker is not running. Please start Docker and try again.');
  }

  // Check if the website is up, start Docker services if not
  const baseURL = process.env.BASE_URL || 'http://localhost:4200';
  let siteUp: boolean;
  try {
    const response = await fetch(baseURL, { signal: AbortSignal.timeout(5000) });
    siteUp = response.ok || response.status < 500;
  } catch {
    siteUp = false;
  }

  if (!siteUp) {
    console.log(`Global setup: ${baseURL} is not reachable. Starting Docker services...`);
    execSync('docker compose up -d', { stdio: 'inherit' });
    console.log('Global setup: Waiting for services to be ready...');
    await waitForUrl(baseURL, 60_000);
  } else {
    console.log(`Global setup: ${baseURL} is up.`);
  }

  console.log('Global setup: Running database migrations and seeds...');
  execSync('docker compose exec laravel-api php artisan migrate:fresh --seed', { stdio: 'inherit' });

  console.log('Global setup: Initializing database connections...');
  // await DbHelper.initializeConnections();
}

async function waitForUrl(url: string, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(3000) });
      if (response.ok || response.status < 500) return;
    } catch {
      // not ready yet
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  throw new Error(`Global setup: ${url} did not become reachable within ${timeoutMs / 1000}s.`);
}

export default globalSetup;
