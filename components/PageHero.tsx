type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  index: string;
};

export function PageHero({ eyebrow, title, description, index }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="mx-auto grid max-w-7xl items-end gap-10 px-5 py-20 md:grid-cols-[1fr_0.8fr] md:px-10 md:py-28">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
        </div>
        <div className="page-hero-copy">
          <span>{index}</span>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}
