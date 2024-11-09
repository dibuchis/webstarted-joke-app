// stores/useUser.ts
import type { get } from 'node_modules/axios/index.cjs';
import { defineStore } from 'pinia'
import { useJoke } from './useJoke'

export const useUser = defineStore( 'user', {
  state: () => ({
    favorites: [] as { id: number }[],
    ratings: [] as { joke: { id: number; rating: number }; }[],
  }),

    actions: {
        addFavorite(joke: { id: number }) {
            this.favorites.push(joke)
        },
    
        removeFavorite(joke: { id: number }) {
            this.favorites = this.favorites.filter((j) => j.id !== joke.id)
        },

        getFavorites() {
            const favoriteIds = this.favorites.map((j) => j.id)
            return favoriteIds.map((id) => 
                useJoke().fetchJokeById(id)
                .then((joke) => {
                    const rating = this.getJokeRating(id)
                    return { ...joke, rating }
                })
            )
        },

        checkFavorite(joke: { id: number }) {
            return this.favorites.some((j) => j.id === joke.id)  
        },
    
        rateJoke(joke: { id: number; rating: number }) {
            this.ratings.push({ joke })
        },

        getJokeRating(id: number) {
            return this.ratings.find((j) => j.joke.id === id)?.joke.rating || 0
        },
    },
})