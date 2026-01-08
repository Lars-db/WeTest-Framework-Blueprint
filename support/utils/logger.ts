import winston from 'winston';
import path from 'path';
import fs from 'fs';

// Create logs directory if it doesn't exist
const logsDir = 'test-results/logs';
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Define log levels
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
    trace: 5,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
    trace: 'grey',
  },
};

// Define formats
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.colorize(),
  winston.format.printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${message}${stack ? `\n${stack}` : ''}`;
  })
);

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

/**
 * Create a Winston logger instance
 * @param testName - Optional test name for context
 * @returns Winston logger instance
 */
export function createLogger(testName?: string) {
  const loggerName = testName || 'WeTest';

  const logger = winston.createLogger({
    levels: customLevels.levels,
    format: fileFormat,
    defaultMeta: { service: loggerName },
    transports: [
      // Console transport for development/debugging
      new winston.transports.Console({
        level: process.env.LOG_LEVEL || 'info',
        format: consoleFormat,
      }),

      // File transport for all logs
      new winston.transports.File({
        filename: path.join(logsDir, 'combined.log'),
        level: 'trace',
        maxsize: 10485760, // 10MB
        maxFiles: 5,
      }),

      // File transport for error logs only
      new winston.transports.File({
        filename: path.join(logsDir, 'error.log'),
        level: 'error',
        maxsize: 10485760, // 10MB
        maxFiles: 5,
      }),
    ],
  });

  // Add color support for custom levels
  winston.addColors(customLevels.colors);

  return logger;
}

/**
 * Default logger instance
 */
export const logger = createLogger();

export default logger;
