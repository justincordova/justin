import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

const imageModules = import.meta.glob<{ default: string }>('../assets/pics/*.{jpg,JPG,jpeg,JPEG}', {
  eager: true,
  query: '?url',
});

export default function Pics() {
  const imageUrls = Object.values(imageModules).map((mod) => mod.default);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  // ESC key to close lightbox
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedImage]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-container">
        <h1 className="mb-8 text-3xl tracking-tight text-ctp-text">Pics</h1>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Photo ${index + 1} of ${imageUrls.length}`}
              loading="eager"
              onClick={() => {
                setImageLoading(true);
                setSelectedImage(url);
              }}
              className="aspect-[4/3] w-full cursor-pointer rounded-lg border border-ctp-surface1 object-cover transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-ctp-surface1/50"
            />
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
            className="absolute right-4 top-4 rounded-full bg-ctp-surface0 p-2 text-ctp-text transition-colors hover:bg-ctp-surface1"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
          {imageLoading && (
            <Loader2 className="absolute h-12 w-12 animate-spin text-ctp-blue" />
          )}
          <img
            src={selectedImage}
            alt={`Enlarged view - Photo ${imageUrls.indexOf(selectedImage) + 1}`}
            onLoad={() => setImageLoading(false)}
            onClick={(e) => e.stopPropagation()}
            className={`max-h-[90vh] max-w-[90vw] rounded-lg object-contain ${imageLoading ? 'opacity-0' : 'animate-zoom-in'}`}
          />
        </div>
      )}
    </div>
  );
}
