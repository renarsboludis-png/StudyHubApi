export interface CountryName {
  common: string;
  official: string;
}

export interface CountryFlag {
  png: string;
  alt?: string;
}

export interface Country {
  cca3: string;
  name: CountryName;
  region: string;
  population: number;
  capital?: string[];
  flags: CountryFlag;
}
