import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex min-h-[60svh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p
        className="text-6xl font-light text-faint"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        404
      </p>
      <p className="text-sm text-muted">Page not found.</p>
      <Link
        to="/"
        className="group mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-content"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
        Back home
      </Link>
    </div>
  );
}
