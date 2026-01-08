import fs from 'fs';
import dotenv from 'dotenv';

async function globalSetup() {
  const ENV = process.env.ENV || 'tst';
  const envPath = `support/environment/.env.${ENV}`;

  if (fs.existsSync(envPath)) {
    console.log(`Loading environment file: ${envPath}`);
    dotenv.config({ path: envPath });
  } else {
    console.warn(`WARNING! Environment file not found: ${envPath}.`);
  }

  console.log('Global setup: Starting environment initialization...');

  console.log('Global setup: Initializing database connections...');
  // await DbHelper.initializeConnections();
}

export default globalSetup;
