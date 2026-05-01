import fs from 'fs';
import path from 'path';

async function globalTeardown() {
    console.log('\n── Global Teardown ──────────────────────────────────');

    // 1. Remove auth state files that may contain sensitive session tokens
    const authDir = path.join('tests', '.auth');
    if (fs.existsSync(authDir)) {
        fs.rmSync(authDir, { recursive: true, force: true });
        console.log(`Global teardown: Removed auth dir → ${authDir}`);
    }

    // 2. Close database connections
    // await DbHelper.closeConnections();

    // 3. Print run summary
    const env = process.env.ENV || 'tst';
    const baseUrl = process.env.BASE_URL || 'http://localhost:4200';
    const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:8091';
    const timestamp = new Date().toISOString();

    const startFile = '.playwright-start';
    let duration = '';
    if (fs.existsSync(startFile)) {
        const startMs = parseInt(fs.readFileSync(startFile, 'utf-8'), 10);
        const elapsedMs = Date.now() - startMs;
        const s = Math.floor(elapsedMs / 1000);
        duration = s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`;
        fs.rmSync(startFile);
    }

    console.log('\nRun summary:');
    console.log(`  Environment : ${env}`);
    console.log(`  Frontend    : ${baseUrl}`);
    console.log(`  API         : ${apiBaseUrl}`);
    if (duration) console.log(`  Duration    : ${duration}`);
    console.log(`  Completed at: ${timestamp}`);
    console.log('─────────────────────────────────────────────────────\n');
}

export default globalTeardown;
