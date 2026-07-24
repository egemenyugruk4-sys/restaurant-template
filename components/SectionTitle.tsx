type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div>
      <p className="text-sm font-semibold tracking-[0.3em] text-accent-soft">
        {eyebrow}
      </p>

      <h2 className="mt-5 text-4xl font-black sm:text-6xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 max-w-xl leading-7 text-white/60">
          {description}
        </p>
      )}
    </div>
  );
}