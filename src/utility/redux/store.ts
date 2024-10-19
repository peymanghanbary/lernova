import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import { memoryGameCardsApi } from '../api/cardsApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store= configureStore({
  reducer: {
    userReducer,
    [memoryGameCardsApi.reducerPath]: memoryGameCardsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(memoryGameCardsApi.middleware),
})

setupListeners(store.dispatch)