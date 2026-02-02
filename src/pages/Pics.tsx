const images = import.meta.glob('../assets/pics/*.JPG', {
  eager: true,
  query: '?url',
});

export default function Pics() {
  const imageUrls = Object.values(images).map((mod: any) => mod.default);

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-container">
        <h1 className="mb-8 text-3xl tracking-tight text-ctp-text">Pics</h1>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt="Photo"
              className="aspect-[4/3] w-full rounded-lg border border-ctp-surface1 object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
