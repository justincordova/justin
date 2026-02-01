import { ImageIcon } from "lucide-react";

export default function Pics() {
  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-container">
        <h1 className="mb-8 text-3xl tracking-tight text-ctp-text">Pics</h1>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-ctp-surface1 bg-ctp-surface0/50"
            >
              <ImageIcon className="h-8 w-8 text-ctp-overlay0" />
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-ctp-overlay0">
          Photos coming soon.
        </p>
      </div>
    </div>
  );
}
