// stores/useJoke.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useJoke = defineStore( 'joke', {
  state: () => ({
    joke: '',
    loading: false,
    error: null,
    types: [],
  }),
  actions: {
    async fetchRandomJoke() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke')
        this.joke = response.data;
      } catch (error: any) {
        this.error = error.message || 'An error occurred';
      } finally {
        this.loading = false;
      }
    },

    async fetchTypeJokes(type: string) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(`https://official-joke-api.appspot.com/types`)
        this.types = response.data;
      } catch (error: any) {
        this.error = error.message || 'An error occurred';
      } finally {
        this.loading = false;
      }
    },

    async fetchJokeById(id: number)
    {
      this.loading = true;
      this.error = null;

      // Just for test pourpose we are using direct endpoint every time
      // In real world we should plan a cache or a local storage 
      // to store the jokes and get it from there

      try {
        const response = await axios.get(`https://official-joke-api.appspot.com/jokes/${id}`)
        return response.data;
      } catch (error: any) {
        this.error = error.message || 'An error occurred';
      } finally {
        this.loading = false;
      }
    }
  },
})