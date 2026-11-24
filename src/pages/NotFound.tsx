import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Page not found");
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-[60svh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-sans text-6xl font-light text-faint">404</h1>
      {/* Answers in the same shell voice as the nav's ~/path label. */}
      <p className="max-w-md font-mono text-sm break-all text-muted">
        cd: no such file or directory: <span className="text-content">~{pathname}</span>
      </p>
      <Link
        to="/"
        className="group mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-content"
      >
        <ArrowLeft
          className="h-4 w-4 transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
        Back home
      </Link>
    </div>
  );
}
