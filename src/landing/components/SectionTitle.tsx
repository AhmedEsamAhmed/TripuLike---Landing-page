type SectionTitleProps = {
  eyebrow: string
  title: string
  subtitle: string
}

export function SectionTitle({ eyebrow, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-8 sm:mb-9 md:mb-10 text-left">
      <p className="mb-2 sm:mb-2.5 md:mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-orange-500 sm:text-[0.7rem] md:text-[0.78rem]">
        {eyebrow}
      </p>
      <h2 className="max-w-2xl text-[clamp(1.5rem,5vw,2.35rem)] font-semibold leading-[1.08] text-[#055f95]">
        {title}
      </h2>
      <p className="mt-3 sm:mt-3.5 md:mt-4 max-w-xl text-[0.85rem] leading-relaxed text-[#067bc2]/80 sm:text-[0.95rem] md:text-[1.02rem]">{subtitle}</p>
    </div>
  )
}
