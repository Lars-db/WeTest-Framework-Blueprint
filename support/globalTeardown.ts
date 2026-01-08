async function globalTeardown() {
    console.log('Global teardown: Starting cleanup process...');

    console.log('Global teardown: Closing database connections...');
    // await DbHelper.closeConnections();

    console.log('Global teardown: Cleanup process completed.');
}

export default globalTeardown;
