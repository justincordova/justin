import winston from "winston";

const IS_PROD = process.env.NODE_ENV === "production";
const IS_TEST = process.env.NODE_ENV === "test";
const LOG_LEVEL = process.env.LOG_LEVEL ?? (IS_PROD ? "info" : "debug");

// ─── Levels ──────────────────────────────────────────────────────────────────

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "green",
  http: "green",
  debug: "blue",
});

// ─── Formats ─────────────────────────────────────────────────────────────────

const SENSITIVE_KEYS = new Set(["password", "token", "authorization", "secret", "apikey"]);

const redactInPlace = (obj: Record<string, unknown>): void => {
  for (const key of Object.keys(obj)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      obj[key] = "[REDACTED]";
    } else if (Array.isArray(obj[key])) {
      for (const item of obj[key] as unknown[]) {
        if (item && typeof item === "object") {
          redactInPlace(item as Record<string, unknown>);
        }
      }
    } else if (obj[key] && typeof obj[key] === "object") {
      redactInPlace(obj[key] as Record<string, unknown>);
    }
  }
};

const redact = winston.format((info) => {
  redactInPlace(info as unknown as Record<string, unknown>);
  return info;
});

const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    const hasMeta = Object.keys(meta).length > 0;
    const metaStr = hasMeta ? `\n${JSON.stringify(meta, null, 2)}` : "";
    return `${timestamp} [${level}]: ${message}${stack ? `\n${stack}` : ""}${metaStr}`;
  }),
);

// ─── Logger ──────────────────────────────────────────────────────────────────
// Vercel serverless has no persistent filesystem — console transport only.

const logger = winston.createLogger({
  level: LOG_LEVEL,
  levels,
  silent: IS_TEST,
  format: winston.format.combine(redact(), winston.format.errors({ stack: true })),
  transports: [new winston.transports.Console({ format: consoleFormat })],
});

// ─── Child logger factory ────────────────────────────────────────────────────

export const childLogger = (service: string) => logger.child({ service });

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const logError = (message: string, error?: unknown, meta?: Record<string, unknown>) => {
  const err = error instanceof Error ? error : new Error(String(error));
  logger.error(message, { errorMessage: err.message, stack: err.stack, ...meta });
};

export const logHttp = (method: string, url: string, status?: number, duration?: number) => {
  logger.http(`${method} ${url}`, { status, duration });
};

export default logger;
