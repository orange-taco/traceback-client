import { PageHeading } from "~/components/page-heading";

const keywords = [
  "Observation",
  "Record",
  "Trace",
  "Public Space",
  "Residual Image",
  "Anonymity",
];

export default function AboutRoute() {
  return (
    <div>
      <PageHeading
        eyebrow="Brand Surface"
        title="About"
        description="TRACEBACK records partial images from public spaces. The object is not the scene itself, but the remaining trace after recognition."
      />
      <section className="grid border-b border-ink/20 md:grid-cols-[1fr_1fr]">
        <div className="border-b border-ink/20 p-4 md:border-b-0 md:border-r md:p-8">
          <p className="meta mb-6">Keywords</p>
          <div className="grid gap-3">
            {keywords.map((keyword) => (
              <div
                key={keyword}
                className="border-t border-ink/20 py-4 font-mono text-sm uppercase tracking-meta"
              >
                {keyword}
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 md:p-8">
          <p className="meta mb-6">Operating Rule</p>
          <div className="frame p-6">
            <p className="font-mono text-xl uppercase leading-9 tracking-meta">
              Do not over-explain the image.
            </p>
            <p className="mt-6 text-sm leading-7 text-muted">
              Digital texture can appear, but technology is not the subject.
              Product pages stay clear. Archive pages stay dry.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
