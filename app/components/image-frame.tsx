import { cn } from "~/lib/classnames";

export function ImageFrame({
  src,
  alt,
  caption,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <figure className={cn("frame overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        className={cn("h-full w-full object-cover grayscale", imageClassName)}
      />
      {caption ? (
        <figcaption className="border-t border-ink/20 px-3 py-2 font-mono text-[10px] uppercase tracking-meta text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
