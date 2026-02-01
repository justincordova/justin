import { useEffect } from "react";
import { X, Download } from "lucide-react";

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ResumeModal({ open, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ctp-crust/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-fade-in relative mx-4 flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-ctp-surface1 bg-ctp-base shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-ctp-surface1 px-5 py-3">
          <span className="text-sm font-medium text-ctp-subtext1">Resume</span>
          <div className="flex items-center gap-2">
            <a
              href="/justincordova.pdf"
              download
              className="rounded-md p-1.5 text-ctp-overlay1 transition-colors hover:bg-ctp-surface0 hover:text-ctp-mauve"
              aria-label="Download resume"
            >
              <Download className="h-4 w-4" />
            </a>
            <button
              onClick={onClose}
              className="rounded-md p-1.5 text-ctp-overlay1 transition-colors hover:bg-ctp-surface0 hover:text-ctp-red"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex-1">
          <iframe
            src="/justincordova.pdf"
            title="Resume"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
