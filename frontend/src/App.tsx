import { useState } from 'react';
import { CountryBrowser } from './features/countries/CountryBrowser';

type AppView = 'guest' | 'member';

function App() {
  const [view, setView] = useState<AppView>('guest');

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between p-4">
          <div>
            <h1 className="text-xl font-bold text-indigo-700">StudyHub Country Explorer</h1>
            <p className="text-sm text-slate-500">React + TypeScript + Axios + Tailwind</p>
          </div>
          <button
            onClick={() => setView((current) => (current === 'guest' ? 'member' : 'guest'))}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            {view === 'guest' ? 'Pieslēgties demo režīmam' : 'Iziet no demo režīma'}
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl p-4 sm:p-6">
        {view === 'guest' ? (
          <section className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold">Viesu skats</h2>
            <p className="text-slate-600">
              Spied pogu augšā, lai simulētu autorizētu lietotāju. Šo stāvokli pārvalda
              <code className="rounded bg-slate-100 px-1 py-0.5">useState</code> App līmenī.
            </p>
          </section>
        ) : (
          <CountryBrowser />
        )}
      </main>
    </div>
  );
}

export default App;
