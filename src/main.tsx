import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { ApiError } from "./lib/github";
import { initLogger, logError } from "./lib/logger";
import "./index.css";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      logError("React Query error", error, {
        queryKey: JSON.stringify(query.queryKey),
      });
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Don't retry 4xx (client errors) — they won't fix themselves.
        // Exception: rate-limited (503 from our API) gets one retry since
        // the in-memory cache may warm up between attempts.
        if (error instanceof ApiError) {
          if (error.isRateLimited) return failureCount < 1;
          if (error.status >= 400 && error.status < 500) return false;
        }
        // Network / 5xx: up to 2 retries with backoff.
        return failureCount < 2;
      },
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
    },
  },
});

initLogger()
  .catch(() => {})
  .finally(() => {
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </StrictMode>,
    );
  });
