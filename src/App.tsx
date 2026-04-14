import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { LandingPage } from './landing/LandingPage'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <main className="grid min-h-screen place-items-center bg-slate-950 px-6 text-white">
            <div className="max-w-xl rounded-2xl border border-slate-700 bg-slate-900/70 p-8 text-center shadow-xl shadow-slate-950/70">
              <p className="text-sm uppercase tracking-[0.2em] text-orange-300">TripuLike</p>
              <h1 className="mt-3 text-4xl font-bold">Core App Placeholder</h1>
              <p className="mt-3 text-slate-300">
                The landing page lives separately and is available at /landing.
              </p>
              <Link
                to="/landing"
                className="mt-6 inline-flex rounded-xl bg-orange-500 px-5 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Open Landing Page
              </Link>
            </div>
          </main>
        }
      />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="*" element={<Navigate to="/landing" replace />} />
    </Routes>
  )
}

export default App
