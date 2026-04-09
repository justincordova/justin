import { Download, X } from "lucide-react";
import { useEffect } from "react";
import FocusLock from "react-focus-lock";

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
    <FocusLock returnFocus>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Resume"
        className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="animate-fade-in relative mx-4 flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-edge bg-bg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-edge px-5 py-3">
            <span className="text-sm font-medium text-muted">Resume</span>
            <div className="flex items-center gap-2">
              <a
                href="/justincordova.pdf"
                download
                className="rounded-md p-1.5 text-muted transition-colors hover:bg-surface hover:text-primary"
                aria-label="Download resume"
              >
                <Download className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-1.5 text-muted transition-colors hover:bg-surface hover:text-red-400"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex-1">
            <iframe src="/justincordova.pdf" title="Resume" className="h-full w-full" />
          </div>
        </div>
      </div>
    </FocusLock>
  );
}
