import fs from 'fs';
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

  console.log('Global setup: Starting environment initialization...');

  console.log('Global setup: Initializing database connections...');
  // await DbHelper.initializeConnections();
}

export default globalSetup;
