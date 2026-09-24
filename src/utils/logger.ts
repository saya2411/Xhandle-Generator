import { LogEntry } from "../types";

const MAX_LOG_HISTORY = 100;
const STORAGE_LOGS_KEY = "x_handle_debug_logs";

type LogListener = (logs: LogEntry[]) => void;

class AppLogger {
  private logs: LogEntry[] = [];
  private listeners: Set<LogListener> = new Set();
  private isSyncingToServer = false;
  private pendingServerSync: LogEntry[] = [];

  constructor() {
    this.loadPersistedLogs();
  }

  private loadPersistedLogs(): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const stored = localStorage.getItem(STORAGE_LOGS_KEY);
        if (stored) {
          this.logs = JSON.parse(stored);
        }
      }
    } catch {
      // Fallback gracefully if storage blocked
      this.logs = [];
    }
  }

  private persistLogs(): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(STORAGE_LOGS_KEY, JSON.stringify(this.logs.slice(0, MAX_LOG_HISTORY)));
      }
    } catch {
      // Ignore quota exceeded or storage failure
    }
  }

  public subscribe(listener: LogListener): () => void {
    this.listeners.add(listener);
    listener([...this.logs]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    const snapshot = [...this.logs];
    this.listeners.forEach((listener) => listener(snapshot));
  }

  public log(level: "info" | "warn" | "error", message: string, details?: Record<string, unknown>): void {
    const entry: LogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      level,
      message,
      details,
    };

    this.logs.unshift(entry);
    if (this.logs.length > MAX_LOG_HISTORY) {
      this.logs.pop();
    }

    this.persistLogs();
    this.notify();

    // Print to browser console with styling
    const prefix = `[X-GEN] [${entry.timestamp}] [${level.toUpperCase()}]`;
    if (level === "error") {
      console.error(prefix, message, details || "");
    } else if (level === "warn") {
      console.warn(prefix, message, details || "");
    } else {
      console.log(prefix, message, details || "");
    }

    // Queue for remote server synchronization if online
    this.queueForServerSync(entry);
  }

  public info(message: string, details?: Record<string, unknown>): void {
    this.log("info", message, details);
  }

  public warn(message: string, details?: Record<string, unknown>): void {
    this.log("warn", message, details);
  }

  public error(message: string, details?: Record<string, unknown>): void {
    this.log("error", message, details);
  }

  public getLogs(): LogEntry[] {
    return [...this.logs];
  }

  public clearLogs(): void {
    this.logs = [];
    this.persistLogs();
    this.notify();
  }

  private queueForServerSync(entry: LogEntry): void {
    this.pendingServerSync.push(entry);
    this.flushServerQueue();
  }

  public async flushServerQueue(): Promise<void> {
    if (this.isSyncingToServer || this.pendingServerSync.length === 0) return;
    if (typeof navigator !== "undefined" && !navigator.onLine) return;

    this.isSyncingToServer = true;
    const batch = [...this.pendingServerSync];

    try {
      for (const item of batch) {
        await fetch("/api/logs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            level: item.level,
            message: item.message,
            details: item.details,
            timestamp: item.timestamp,
          }),
        });
      }
      this.pendingServerSync = this.pendingServerSync.slice(batch.length);
    } catch {
      // Retain in queue for next reconnect
    } finally {
      this.isSyncingToServer = false;
    }
  }
}

export const logger = new AppLogger();
