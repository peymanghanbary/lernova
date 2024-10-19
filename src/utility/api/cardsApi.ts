import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const memoryGameCardsApi = createApi({
  reducerPath: 'memoryGameCardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://masalche.torus.ir/' }),
  endpoints: (builder) => ({
    getMemoryCards: builder.query<string[],void>({
      query: () => `memoryGameCards`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMemoryCardsQuery } = memoryGameCardsApi