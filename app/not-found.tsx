import Link from "next/link";

// 404 in the brand's voice — restrained, a little knowing, and a single brass
// way back. No illustration, no apology theatre.
export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[hsl(var(--background))] px-6 text-center text-[hsl(var(--foreground))]">
      <span
        className="text-xs font-light uppercase tracking-[0.5em] text-[hsl(var(--gray-300)/0.6)]"
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
      >
        Error 404
      </span>

      <h1 className="mt-8 font-serif text-4xl md:text-6xl font-normal leading-[1.06] tracking-[-0.02em]">
        This page is <span className="italic">not for the public.</span>
      </h1>

      <p className="mt-6 max-w-md text-base md:text-lg leading-relaxed text-[hsl(var(--gray-300)/0.8)]">
        Or, more likely, it simply isn&apos;t here. Let&apos;s return you to
        firmer ground.
      </p>

      <Link
        href="/"
        className="group mt-12 inline-block text-sm tracking-[0.2em] text-[hsl(var(--gray-300)/0.9)] transition-colors duration-300 hover:text-[hsl(var(--foreground))]"
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
      >
        <span className="relative inline-block uppercase">
          Return to Crestmont
          <span
            className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-[hsl(var(--brass))] transition-transform duration-500 ease-out group-hover:scale-x-100"
            aria-hidden
          />
        </span>
      </Link>
    </main>
  );
}
