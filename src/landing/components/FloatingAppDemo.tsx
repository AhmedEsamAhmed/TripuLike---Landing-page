export function FloatingAppDemo() {
  return (
    <button
      type="button"
      title="App demo coming soon"
      aria-label="App demo coming soon"
      className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#067bc2]/35 bg-white text-[#067bc2] shadow-xl shadow-[#067bc2]/25 transition hover:scale-105 sm:bottom-5 sm:right-5 sm:h-14 sm:w-14"
      onClick={() => {
        console.log('App demo coming soon')
      }}
    >
      <span className="text-xl sm:text-2xl" role="img" aria-hidden="true">📱</span>
    </button>
  )
}
