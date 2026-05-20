import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { useSpacePageScroll } from "@/hooks/useSpacePageScroll";
import { getAlbumCover, getAlbumPhotos } from "@/lib/album-images";
import { ALBUMS } from "@/lib/albums";

const MONO_FONT = "'Geist Mono', ui-monospace, monospace";

export default function Pics() {
  // Note: useSpacePageScroll handles its own input-target guards so it won't
  // fire while a user is typing.
  useSpacePageScroll();

  // Filter out albums whose photos are missing from disk (defensive — keeps
  // the page from rendering broken cards if albums.ts gets out of sync).
  const albums = ALBUMS.map((meta) => ({
    meta,
    cover: getAlbumCover(meta.slug, meta.cover),
    count: getAlbumPhotos(meta.slug).length,
  })).filter((a) => a.cover !== null && a.count > 0);

  const totalPhotos = albums.reduce((sum, a) => sum + a.count, 0);

  return (
    <div className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-container">
        {/* Header — same shape as Projects page for cross-page consistency */}
        <header className="animate-fade-up stagger-1 mb-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h1
            className="tracking-tight text-content"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
            }}
          >
            Pics
          </h1>
          {albums.length > 0 && (
            <p className="truncate text-xs text-faint" style={{ fontFamily: MONO_FONT }}>
              {albums.length} album{albums.length === 1 ? "" : "s"} · {totalPhotos} photo
              {totalPhotos === 1 ? "" : "s"}
            </p>
          )}
        </header>

        {albums.length === 0 ? (
          <p className="text-sm text-muted">No albums yet.</p>
        ) : (
          // Single column on mobile, two on tablet+, three on desktop. With
          // one album today the card sits comfortably wide; adding more later
          // just fills the grid out naturally.
          <div className="animate-fade-up stagger-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album, index) => (
              <AlbumCard
                key={album.meta.slug}
                slug={album.meta.slug}
                title={album.meta.title}
                date={album.meta.date}
                location={album.meta.location}
                count={album.count}
                cover={album.cover!}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

type CoverPhoto = NonNullable<ReturnType<typeof getAlbumCover>>;

function AlbumCard({
  slug,
  title,
  date,
  location,
  count,
  cover,
  index,
}: {
  slug: string;
  title: string;
  date: string;
  location?: string;
  count: number;
  cover: CoverPhoto;
  index: number;
}) {
  return (
    <Link
      to={`/pics/${slug}`}
      className="group block animate-fade-up"
      style={{ animationDelay: `${Math.min(index, 6) * 60}ms` }}
      aria-label={`Open album: ${title}`}
    >
      {/* Cover — fixed 4:3 frame so cards align in the grid regardless of
          the underlying photo's aspect ratio. The interior <picture> scales
          to fill via object-cover. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-edge bg-surface/40 transition-all duration-300 group-hover:border-edge/80 group-hover:shadow-lg group-hover:shadow-black/20">
        <picture>
          {cover.thumb.sources.webp && (
            <source srcSet={cover.thumb.sources.webp} type="image/webp" />
          )}
          <img
            src={cover.thumb.img.src}
            srcSet={cover.thumb.sources.jpg}
            alt={`${title} cover`}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 350px, (min-width: 640px) 50vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </picture>

        {/* Bottom gradient + label — ensures the title is readable over any
            photo without needing to know its luminance. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h2
                className="truncate font-medium text-white"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1.0625rem",
                }}
              >
                {title}
              </h2>
              <p
                className="mt-0.5 truncate text-[11px] tracking-[0.1em] text-white/70"
                style={{ fontFamily: MONO_FONT }}
              >
                {date} · {count} photo{count === 1 ? "" : "s"}
              </p>
            </div>
            <ArrowUpRight
              className="h-4 w-4 shrink-0 text-white/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Below-card meta line for location — kept outside the gradient so
          it doesn't compete with the title overlay. */}
      {location && (
        <p className="mt-2 truncate px-0.5 text-xs text-faint" style={{ fontFamily: MONO_FONT }}>
          {location}
        </p>
      )}
    </Link>
  );
}
