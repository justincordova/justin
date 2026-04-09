import type { Plugin } from "vite";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { IncomingMessage, ServerResponse } from "node:http";
import { URL } from "node:url";

interface ApiRoute {
  pattern: string;
  handler: (req: VercelRequest, res: VercelResponse) => unknown;
}

async function loadRoutes(): Promise<ApiRoute[]> {
  const health = await import("./health");
  const repos = await import("./github/repos");
  const commits = await import("./github/commits");

  return [
    { pattern: "/api/health", handler: health.default },
    { pattern: "/api/github/repos", handler: repos.default },
    { pattern: "/api/github/commits", handler: commits.default },
  ];
}

function parseQuery(url: string): Record<string, string | string[]> {
  const parsed = new URL(url, "http://localhost");
  const query: Record<string, string | string[]> = {};
  for (const [key, value] of parsed.searchParams) {
    query[key] = value;
  }
  return query;
}

export default function apiDevPlugin(): Plugin {
  let routes: ApiRoute[] = [];

  return {
    name: "api-dev",
    configureServer(server) {
      loadRoutes()
        .then((r) => (routes = r))
        .catch((e) => console.error("[api-dev] Failed to load routes:", e));

      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
        const url = req.url ?? "";
        const route = routes.find((r) => url === r.pattern || url.startsWith(r.pattern + "?"));
        if (!route) return next();

        const vercelReq = req as unknown as VercelRequest;
        vercelReq.query = parseQuery(url);

        const vercelRes = res as unknown as VercelResponse;
        vercelRes.status = (code: number) => {
          res.statusCode = code;
          return vercelRes;
        };
        vercelRes.json = (data: unknown) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(data));
          return vercelRes;
        };

        route.handler(vercelReq, vercelRes);
      });
    },
  };
}
