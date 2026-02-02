export default function About() {
  return (
    <div className="px-6 py-10">
      <div className="mx-auto grid max-w-container items-start gap-10 md:grid-cols-[2fr_3fr]">
        <div className="flex justify-center">
          <img
            src="/about.JPG"
            alt="Justin Cordova"
            className="h-56 w-56 rounded-xl border border-ctp-surface1 object-cover"
          />
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
