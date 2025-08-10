import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Character, SearchResults } from '../interfaces/interfaces';

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api' }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      SearchResults,
      { name?: string; page?: number }
    >({
      query: ({ name, page }) => {
        const characterUrl =
          name !== ''
            ? `/character/?page=${page}&name=${name}`
            : `/character/?page=${page}`;
        return characterUrl;
      },
    }),
    getCharacter: builder.query<Character, number>({
      query: (id) => {
        return `/character/${id}`;
      },
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } = rickAndMortyApi;
