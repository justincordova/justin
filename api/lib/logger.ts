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

// Clones the object (deep over plain objects/arrays) while replacing
// values under sensitive keys. We don't mutate the input because the
// same object can flow through other winston formatters or escape into
// downstream code — mutating would permanently overwrite caller data.
const redactClone = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map((v) => redactClone(v));
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = SENSITIVE_KEYS.has(k.toLowerCase()) ? "[REDACTED]" : redactClone(v);
    }
    return out;
  }
  return value;
};

const redact = winston.format((info) => {
  // info itself is a winston object with Symbol-keyed metadata — return a
  // new info-shaped object with redacted enumerable props plus the original
  // symbol props preserved.
  const redacted = redactClone(info) as Record<string, unknown>;
  for (const sym of Object.getOwnPropertySymbols(info)) {
    redacted[sym as unknown as string] = (info as Record<string | symbol, unknown>)[sym];
  }
  return redacted as typeof info;
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
