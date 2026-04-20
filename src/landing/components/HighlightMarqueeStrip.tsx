const marqueeItems = [
  'snorkeling',
  'airport transfer',
  'local guide',
  'island day trip',
  'translator',
  'water adventure',
  'city photoshoot stop',
  'custom experience',
]

export function HighlightMarqueeStrip() {
  const repeatedItems = [...marqueeItems, ...marqueeItems]

  return (
    <section className="px-4 py-3 sm:py-4 md:px-8">
      <div className="mx-auto w-full max-w-[1280px] overflow-hidden rounded-full border border-[#067bc2]/12 bg-white/80 shadow-sm shadow-[#067bc2]/8 backdrop-blur-sm">
        <div className="tripu-marquee group relative overflow-hidden py-2 sm:py-2.5 md:py-3">
          <div className="tripu-marquee-track flex w-max items-center gap-2 px-3 sm:gap-3 sm:px-4" style={{ animationDuration: '42s' }}>
            {repeatedItems.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="inline-flex items-center rounded-full border border-[#067bc2]/12 bg-[#067bc2]/5 px-2.5 py-1 text-[0.7rem] font-semibold text-[#055f95] sm:px-3.5 sm:py-1.5 sm:text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
