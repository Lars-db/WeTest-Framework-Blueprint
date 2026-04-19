import fs from 'fs';
import path from 'path';

async function globalTeardown() {
    console.log('\n── Global Teardown ──────────────────────────────────');

    // 1. Remove auth state files that may contain sensitive session tokens
    const authDir = path.join('tests', '.auth');
    if (fs.existsSync(authDir)) {
        const authFiles = fs.readdirSync(authDir).filter(f => f.endsWith('.json'));
        if (authFiles.length > 0) {
            authFiles.forEach(file => {
                fs.rmSync(path.join(authDir, file));
                console.log(`Global teardown: Removed auth state file → ${path.join(authDir, file)}`);
            });
        } else {
            console.log('Global teardown: No auth state files to remove.');
        }
    }

    // 2. Close database connections
    // await DbHelper.closeConnections();

    // 3. Print run summary
    const env = process.env.ENV || 'tst';
    const baseUrl = process.env.BASE_URL || 'http://localhost:4200';
    const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:8091';
    const timestamp = new Date().toISOString();

    console.log('\nRun summary:');
    console.log(`  Environment : ${env}`);
    console.log(`  Frontend    : ${baseUrl}`);
    console.log(`  API         : ${apiBaseUrl}`);
    console.log(`  Completed at: ${timestamp}`);
    console.log('─────────────────────────────────────────────────────\n');
}

export default globalTeardown;
