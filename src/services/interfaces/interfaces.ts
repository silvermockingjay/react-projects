export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Record<string, string>;
  location: Record<string, string>;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface SearchResults {
  info: Info;
  results: Array<Character>;
}
