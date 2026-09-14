import { cn } from "~/lib/classnames";

export function ImageFrame({
  src,
  alt,
  caption,
  className,
  imageClassName,
  fit = "cover",
  tone = "grayscale",
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imageClassName?: string;
  fit?: "cover" | "contain";
  tone?: "normal" | "grayscale";
}) {
  return (
    <figure className={cn("frame overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        className={cn(
          "h-full w-full",
          fit === "contain" ? "object-contain" : "object-cover",
          tone === "grayscale" && "grayscale contrast-[1.08]",
          imageClassName,
        )}
      />
      {caption ? (
        <figcaption className="border-t border-border-default px-3 py-2 font-mono text-[10px] uppercase tracking-meta text-text-secondary">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
