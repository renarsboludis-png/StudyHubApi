import axios from 'axios';
import type { Country } from './types';

const restCountriesApi = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 10000
});

export async function fetchAllCountries(): Promise<Country[]> {
  const response = await restCountriesApi.get<Country[]>('/all', {
    params: {
      fields: 'cca3,name,region,population,capital,flags'
    }
  });

  return response.data;
}
