import { useEffect, useMemo, useState } from 'react';
import { fetchAllCountries } from './api';
import type { Country } from './types';

export function CountryBrowser() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCountries = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchAllCountries();
        setCountries(data.sort((a, b) => a.name.common.localeCompare(b.name.common)));
      } catch {
        setError('Neizdevās ielādēt valstu datus. Pamēģini vēlreiz.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadCountries();
  }, []);

  const regions = useMemo(() => {
    const unique = Array.from(new Set(countries.map((country) => country.region).filter(Boolean)));
    return ['All', ...unique];
  }, [countries]);

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesRegion = selectedRegion === 'All' || country.region === selectedRegion;
      const matchesSearch = country.name.common.toLowerCase().includes(search.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }, [countries, search, selectedRegion]);

  return (
    <section className="space-y-4">
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold">Valstu katalogs</h2>
        <p className="text-sm text-slate-500">Dati nāk no publiska REST Countries API.</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Meklēt valsti..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-300 focus:ring"
          />

          <select
            value={selectedRegion}
            onChange={(event) => setSelectedRegion(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-300 focus:ring"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading && <p className="rounded-lg bg-blue-50 p-4 text-blue-700">Loading...</p>}
      {error && <p className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p>}

      {!isLoading && !error && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCountries.map((country) => (
            <article key={country.cca3} className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <img
                src={country.flags.png}
                alt={country.flags.alt ?? `Flag of ${country.name.common}`}
                className="h-32 w-full object-cover"
                loading="lazy"
              />
              <div className="space-y-1 p-4">
                <h3 className="font-semibold">{country.name.common}</h3>
                <p className="text-sm text-slate-600">Reģions: {country.region || 'Nav zināms'}</p>
                <p className="text-sm text-slate-600">Galvaspilsēta: {country.capital?.[0] ?? 'Nav datu'}</p>
                <p className="text-sm text-slate-600">
                  Iedzīvotāji: {new Intl.NumberFormat('lv-LV').format(country.population)}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
