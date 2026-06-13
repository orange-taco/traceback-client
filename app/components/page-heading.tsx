export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="border-b border-ink/20 px-4 py-8 md:px-8 md:py-12">
      {eyebrow ? <p className="meta mb-4">{eyebrow}</p> : null}
      <h1 className="max-w-4xl font-mono text-3xl uppercase tracking-widebrand md:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 max-w-2xl text-sm leading-6 text-muted md:text-base">
          {description}
        </p>
      ) : null}
    </header>
  );
}
