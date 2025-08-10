import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Character, SearchResults } from '../interfaces/interfaces';

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api' }),
  tagTypes: ['SearchResults', 'Character'],
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
      providesTags: (result, _error, arg) =>
        result
          ? [
              { type: 'SearchResults', id: `${arg.name}, ${arg.page}` },
              ...result.results.map(({ id }) => ({
                type: 'Character' as const,
                id,
              })),
            ]
          : [{ type: 'SearchResults', id: `${arg.name}, ${arg.page}` }],
      keepUnusedDataFor: 300,
    }),
    getCharacter: builder.query<Character, number>({
      query: (id) => {
        return `/character/${id}`;
      },
      providesTags: (_result, _error, arg) => [
        { type: 'Character', id: `${arg}` },
      ],
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } = rickAndMortyApi;
