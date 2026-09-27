class SimpleLogger {
  info(message: string, details?: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[X-GEN] ${message}`, details ?? "");
    }
  }

  warn(message: string, details?: unknown) {
    console.warn(`[X-GEN] ${message}`, details ?? "");
  }

  error(message: string, details?: unknown) {
    console.error(`[X-GEN] ${message}`, details ?? "");
  }
}

export const logger = new SimpleLogger();
