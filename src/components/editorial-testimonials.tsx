import { testimonials } from "@/lib/data";

function Letter({
  quote,
  name,
  role,
  className,
}: {
  quote: string;
  name: string;
  role: string;
  className?: string;
}) {
  const clean = quote.replace(/^[“"']?/, "").replace(/[”"']?$/, "");
  const first = clean.charAt(0);
  const rest = clean.slice(1);
  return (
    <figure className={className}>
      <blockquote className="font-serif text-[1.05rem] leading-relaxed text-forest/90">
        <span className="float-left mr-2 mt-1 font-serif text-5xl font-black leading-[0.7] text-cobalt">
          {first}
        </span>
        {rest}
      </blockquote>
      <figcaption className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-forest/55">
        {name} · {role}
      </figcaption>
    </figure>
  );
}

export function EditorialTestimonials() {
  const letters = testimonials.slice(0, 3);
  return (
    <section className="bg-cream text-forest">
      <div className="container-tight py-20 sm:py-28">
        {/* Masthead */}
        <div className="flex items-end justify-between gap-6 border-b-2 border-forest/15 pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-forest/50">
              Nº 01 — Client letters
            </span>
            <h2 className="mt-3 font-serif text-5xl font-black leading-[0.92] tracking-tight sm:text-6xl">
              What clients say.
              <span className="block font-serif text-3xl font-medium italic text-cobalt sm:text-4xl">
                in their own words.
              </span>
            </h2>
          </div>
          {/* Seal */}
          <div className="hidden shrink-0 sm:block">
            <div className="flex size-16 items-center justify-center rounded-md border-2 border-cobalt p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/td_monogram_cobalt.svg"
                alt="TopDoerr"
                className="h-full w-auto"
              />
            </div>
          </div>
        </div>

        {/* Letters */}
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0">
          {letters.map((t, i) => (
            <Letter
              key={t.name}
              quote={t.quote}
              name={t.name}
              role={t.role}
              className={
                i > 0 ? "md:border-l md:border-forest/15 md:pl-8" : "md:pr-8"
              }
            />
          ))}
        </div>

        {/* Colophon */}
        <div className="mt-14 flex flex-col items-center justify-between gap-2 border-t-2 border-forest/15 pt-6 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-forest/50 sm:flex-row sm:text-left">
          <span>TopDoerr — Managed AI delivery</span>
          <span>Spanish-first · Puerto Rico &amp; LATAM</span>
          <span>We Keep It Human.</span>
        </div>
      </div>
    </section>
  );
}
