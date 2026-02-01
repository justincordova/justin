import { User } from "lucide-react";

export default function About() {
  return (
    <div className="px-6 py-10">
      <div className="mx-auto grid max-w-container items-start gap-10 md:grid-cols-[2fr_3fr]">
        <div className="flex justify-center">
          <div className="flex h-56 w-56 items-center justify-center rounded-xl border border-ctp-surface1 bg-ctp-surface0">
            <User className="h-12 w-12 text-ctp-overlay0" />
          </div>
        </div>

        <div>
          <h1 className="mb-4 text-3xl tracking-tight text-ctp-text">About</h1>
          <p className="leading-relaxed text-ctp-subtext1">
            Bio coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
