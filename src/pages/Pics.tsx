import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import FocusLock from "react-focus-lock";

const imageModules = import.meta.glob<{ default: string }>("../assets/pics/*.{jpg,JPG,jpeg,JPEG}", {
  eager: false,
  query: "?url",
});

const imagePaths = Object.keys(imageModules);

export default function Pics() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    Promise.all(imagePaths.map((path) => imageModules[path]())).then((modules) =>
      setImageUrls(modules.map((m) => m.default)),
    );
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedImage) {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedImage]);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-container">
        <h1 className="animate-fade-up stagger-1 mb-8 text-3xl tracking-tight text-content">
          Pics
        </h1>

        <div className="animate-fade-up stagger-2 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {imageUrls.map((url, index) => (
            <img
              key={imagePaths[index]}
              src={url}
              alt={`Photo ${index + 1} of ${imageUrls.length}`}
              loading="lazy"
              onClick={() => {
                setImageLoading(true);
                setSelectedImage(url);
              }}
              className="aspect-[4/3] w-full cursor-pointer rounded-lg border border-edge object-cover transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-edge/50"
            />
          ))}
        </div>
      </div>

      {selectedImage && (
        <FocusLock returnFocus>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              aria-label="Close lightbox"
              className="absolute right-3 top-3 z-10 rounded-full bg-surface p-2 text-content transition-colors hover:bg-surface-2"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
            {imageLoading && <Loader2 className="absolute h-12 w-12 animate-spin text-primary" />}
            <img
              src={selectedImage}
              alt={`Enlarged view - Photo ${imageUrls.indexOf(selectedImage) + 1}`}
              onLoad={() => setImageLoading(false)}
              onClick={(e) => e.stopPropagation()}
              className={`max-h-[90vh] max-w-[90vw] rounded-lg object-contain ${imageLoading ? "opacity-0" : "animate-zoom-in"}`}
            />
          </div>
        </FocusLock>
      )}
    </div>
  );
}
