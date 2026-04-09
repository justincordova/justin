import { configure, getConsoleSink, getLogger, type LogRecord } from "@logtape/logtape";

const IS_DEV = import.meta.env.DEV;

const LOG_LEVEL = IS_DEV ? "debug" : "info";

const SENSITIVE_KEYS = new Set(["password", "token", "authorization", "secret", "apikey"]);

function redactProperties(obj: Record<string, unknown>): Record<string, unknown> {
  const redacted: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      redacted[key] = "[REDACTED]";
    } else if (Array.isArray(value)) {
      redacted[key] = value.map((item) =>
        item && typeof item === "object" ? redactProperties(item as Record<string, unknown>) : item,
      );
    } else if (value && typeof value === "object") {
      redacted[key] = redactProperties(value as Record<string, unknown>);
    } else {
      redacted[key] = value;
    }
  }
  return redacted;
}

function formatTimestamp(): string {
  return new Date().toISOString().replace("T", " ").slice(0, 19);
}

const consoleSink = getConsoleSink({
  formatter(record: LogRecord): readonly unknown[] {
    const timestamp = formatTimestamp();
    const level = record.level.toUpperCase().padEnd(5);
    const category = record.category.join(".");

    let msg = "";
    const values: unknown[] = [];
    for (let i = 0; i < record.message.length; i++) {
      if (i % 2 === 0) msg += record.message[i];
      else {
        msg += "%o";
        values.push(record.message[i]);
      }
    }

    const props = record.properties
      ? redactProperties(record.properties as Record<string, unknown>)
      : null;
    const hasProps = props && Object.keys(props).length > 0;

    return [
      `%s [%s] %c%s%c ${msg}${hasProps ? "\n%o" : ""}`,
      timestamp,
      level,
      "color: gray;",
      category,
      "color: default;",
      ...values,
      ...(hasProps ? [props] : []),
    ];
  },
});

let configured = false;

export async function initLogger(): Promise<void> {
  if (configured) return;
  configured = true;

  await configure({
    sinks: { console: consoleSink },
    loggers: [
      {
        category: ["justin-portfolio"],
        lowestLevel: LOG_LEVEL,
        sinks: ["console"],
      },
    ],
  });
}

export function childLogger(service: string) {
  return getLogger(["justin-portfolio", service]);
}

export function logError(message: string, error?: unknown, meta?: Record<string, unknown>) {
  const logger = getLogger(["justin-portfolio"]);
  if (error instanceof Error) {
    logger.error(`${message}: {error}`, {
      error: error.message,
      stack: error.stack,
      ...meta,
    });
  } else if (error !== undefined) {
    logger.error(`${message}: {error}`, { error: String(error), ...meta });
  } else {
    logger.error(message, meta);
  }
}

export function logHttp(method: string, url: string, status?: number, duration?: number) {
  const logger = getLogger(["justin-portfolio", "http"]);
  logger.info(`${method} ${url}`, { status, duration });
}
