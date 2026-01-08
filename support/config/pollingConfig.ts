import { Durations } from "../enums/durations";

export interface PollingConfig {
    timeout: number; // in milliseconds
    intervals: number[];
    initialDelay?: number; // in milliseconds
};

export const POLLING_CONFIG = {
    // Very fast polling: Operations that should complete almost immediately (e.g., 5 seconds)
    VERY_FAST: {
        timeout: Durations.FIVE_SECONDS,
        intervals: [Durations.HALF_SECOND]
    } as PollingConfig,
    // Fast polling: Operations that should complete within a short time frame (e.g., 10 seconds)
    FAST: {
        timeout: Durations.TEN_SECONDS,
        intervals: [Durations.ONE_SECOND]
    } as PollingConfig,
    // Normal polling: Operations that may take a moderate amount of time (e.g., 30 seconds)
    NORMAL: {
        timeout: Durations.THIRTY_SECONDS,
        intervals: [Durations.ONE_SECOND]
    } as PollingConfig,
    // Gradual polling: Operations that may take longer and benefit from increasing intervals
    GRADUAL : {
        timeout: Durations.THIRTY_SECONDS,
        intervals: [Durations.ONE_SECOND, Durations.TWO_SECONDS, Durations.FIVE_SECONDS]
    } as PollingConfig,
    // Patient polling: Operations that may take a significant amount of time (e.g., 1 minute)
    PATIENT: {
        timeout: Durations.ONE_MINUTE,
        intervals: [Durations.TWO_SECONDS, Durations.FIVE_SECONDS, Durations.TEN_SECONDS]
    } as PollingConfig,
    // Extended polling: Operations that may take a long time (e.g., 2 minutes)
    EXTENDED: {
        timeout: Durations.TWO_MINUTES,
        intervals: [Durations.FIVE_SECONDS, Durations.TEN_SECONDS],
        initialDelay: Durations.TEN_SECONDS
    } as PollingConfig
} as const;

// Helper function to create custom polling configurations
/**
 * Creates a custom polling configuration with specified timeout and retry intervals.
 * @param timeout - The maximum time in milliseconds to attempt polling
 * @param intervals - An array of delay intervals in milliseconds between retry attempts
 * @param initialDelay - Optional initial delay in milliseconds before starting polls
 * @returns A PollingConfig object
 * @example
 * // Create a polling config that retries for 20 seconds with specific intervals
 * const config = createPollingConfig(20000, [1000, 2000, 5000]);
 */
export function createPollingConfig(timeout: number, intervals: number[], initialDelay?: number): PollingConfig {
    return {
        timeout,
        intervals,
        initialDelay
    };
}

// Helper function create polling with uniform intervals
/**
 * Creates a polling configuration with uniform intervals between retries.
 * @param timeout - The maximum time in milliseconds to attempt polling
 * @param interval - The uniform delay interval in milliseconds between each retry
 * @param count - Optional number of times to repeat the interval. If not specified, interval is used once
 * @param initialDelay - Optional initial delay in milliseconds before starting polls
 * @returns A PollingConfig object
 * @example
 * // Create a polling config that retries for 15 seconds, waiting 1 second between attempts
 * const config = createUniformPollingConfig(15000, 1000);
 * 
 * // Create the same config but with 5 retries
 * const configWithCount = createUniformPollingConfig(15000, 1000, 5);
 */
export function createUniformPollingConfig(timeout: number, interval: number, count?: number, initialDelay?: number): PollingConfig {
    const intervals = count ? new Array(count).fill(interval) : [interval];
    return {
        timeout,
        intervals,
        initialDelay
    };
}