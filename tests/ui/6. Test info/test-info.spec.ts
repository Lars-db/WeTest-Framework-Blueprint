/*

    Leverage pushing variables to the test info annotations in order avoid race conditions when running tests in parallel.

    This happens when you cannot define variables globally for the entire suite, because both tests will try to read/write the same variable at the same time.
    You might define such variables globally because you want to reference them in hooks like afterEach of afterAll. 
    For example: a randomly generated user ID that you create in a test and want to delete in an afterEach hook.

    By pushing the variable to the test info annotations, each test will have its own copy of the variable, avoiding race conditions.

*/