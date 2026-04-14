export function FloatingAppDemo() {
  return (
    <button
      type="button"
      title="App demo coming soon"
      aria-label="App demo coming soon"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-[#067bc2]/35 bg-white text-[#067bc2] shadow-xl shadow-[#067bc2]/25 transition hover:scale-105"
      onClick={() => {
        console.log('App demo coming soon')
      }}
    >
      <span className="text-2xl" role="img" aria-hidden="true">📱</span>
    </button>
  )
}
