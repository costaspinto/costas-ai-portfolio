export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="mb-8 max-w-2xl"><p className="mb-3 text-xs font-bold uppercase tracking-[.22em] text-forest">{eyebrow}</p><h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>{description && <p className="mt-3 leading-7 text-slate-600">{description}</p>}</div>;
}
