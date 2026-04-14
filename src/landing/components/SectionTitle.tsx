type SectionTitleProps = {
  eyebrow: string
  title: string
  subtitle: string
}

export function SectionTitle({ eyebrow, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-10 text-left">
      <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-orange-500 md:text-[0.78rem]">
        {eyebrow}
      </p>
      <h2 className="max-w-3xl text-[2rem] font-semibold leading-[1.08] text-[#055f95] md:text-[2.35rem]">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-[#067bc2]/80 md:text-[1.02rem]">{subtitle}</p>
    </div>
  )
}
