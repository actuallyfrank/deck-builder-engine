/**
 * A singleton logging utility class that provides different log levels
 * and debug mode functionality.
 *
 * @example
 * // Get the logger instance
 * const logger = Log.getInstance();
 *
 * // Enable debug mode
 * logger.enableDebug(true);
 *
 * // Log messages at different levels
 * logger.info('User logged in', { userId: 'abc123' });
 * logger.debug('Auth token details', { expiry: '2023-12-31' });
 * logger.warn('Rate limit approaching', { currentUsage: '85%' });
 * logger.error('API request failed', new Error('Timeout'));
 */
export class Log {
  private static instance: Log;
  private debugMode: boolean = false;

  private constructor() {}

  /**
   * Returns the singleton instance of the Log class.
   *
   * @returns {Log} The singleton Log instance
   *
   * @example
   * const logger = Log.getInstance();
   */
  public static getInstance(): Log {
    if (!Log.instance) {
      Log.instance = new Log();
    }
    return Log.instance;
  }

  /**
   * Enables or disables debug mode.
   * When debug mode is enabled, debug messages will be logged.
   *
   * @param {boolean} enable - Whether to enable debug mode, defaults to true
   *
   * @example
   * const logger = Log.getInstance();
   * logger.enableDebug(); // Enable debug mode
   * logger.enableDebug(false); // Disable debug mode
   */
  public enableDebug(enable: boolean = true): void {
    this.debugMode = enable;
  }

  /**
   * Checks if debug mode is currently enabled.
   *
   * @returns {boolean} True if debug mode is enabled, false otherwise
   *
   * @example
   * if (logger.isDebugEnabled()) {
   *   // Perform intensive debug operations
   *   performDetailedDiagnostics();
   * }
   */
  public isDebugEnabled(): boolean {
    return this.debugMode;
  }

  /**
   * Logs an informational message.
   *
   * @param {string} message - The message to log
   * @param {...any} args - Additional arguments to log
   *
   * @example
   * logger.info('User authenticated', { userId: 'user123' });
   */
  public info(message: string, ...args: any[]): void {
    console.log(`[INFO] ${message}`, ...args);
  }

  /**
   * Logs a debug message if debug mode is enabled.
   *
   * @param {string} message - The debug message to log
   * @param {...any} args - Additional arguments to log
   *
   * @example
   * logger.debug('Processing payload', payload);
   */
  public debug(message: string, ...args: any[]): void {
    if (this.debugMode) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }

  /**
   * Logs a warning message.
   *
   * @param {string} message - The warning message to log
   * @param {...any} args - Additional arguments to log
   *
   * @example
   * logger.warn('Cache miss', { key: 'user-preferences' });
   */
  public warn(message: string, ...args: any[]): void {
    console.warn(`[WARN] ${message}`, ...args);
  }

  /**
   * Logs an error message.
   *
   * @param {string} message - The error message to log
   * @param {...any} args - Additional arguments to log
   *
   * @example
   * try {
   *   // Some operation that might fail
   * } catch (error) {
   *   logger.error('Operation failed', error);
   * }
   */
  public error(message: string, ...args: any[]): void {
    console.error(`[ERROR] ${message}`, ...args);
  }
}
