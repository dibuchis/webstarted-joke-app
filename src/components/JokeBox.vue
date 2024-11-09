<template>
  <div class="joke-box">
    <div class="user-menu">
      <div class="button button--green" @click="getJoke">Let's fun</div>
    </div>

    <div class="details">
      <p v-if="loading">Loading...</p>
      <p v-else-if="error">{{ error }}</p>
      <div v-else-if="joke">
        <Joke :joke="joke" />
      </div>
    </div>

    <div v-if="joke" class="joke-actions">
      <div class="action-item action-rating">
        <label>Rating: </label> <Rating :joke-id="joke.id" />
      </div>
      <div class="action-item action-favorite">
        <Favorite :joke-id="joke.id" />
      </div>
    </div>

    <div class="user-menu">
      <button v-if="hasFavorites" class="button button--blue" @click="showFavorites">My Favorites</button>
    </div>

    <div v-if="myFavorites.length > 0" class="favorite-jokes">
      <div v-if="loadingFavorites" class="loading">Loading...</div>
      <div v-else-if="errorFavorites" class="error">{{ errorFavorites }}</div>
      <div v-else-if="myFavorites.length > 0" class="favorites">
        <h3>My Favorite Jokes</h3>
          <div v-for="favorite in myFavorites" :key="favorite.id" class="item">
            <Joke :joke="favorite" />
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Vue Composition API
  import { computed, ref } from 'vue';
  import { useJoke } from '../stores/useJoke';
  import { useUser } from '../stores/useUser';
  import Rating from '../components/Rating.vue';
  import Favorite from '../components/Favorite.vue';
  import Joke from '../components/Joke.vue';

  // Store
  const dataJokeStore = useJoke();
  const dataUserStore = useUser();
  import type { JokeType } from '../types/JokeType.ts';
  
  // Favorites state
  const myFavorites = ref<JokeType[]>([]);
  const loadingFavorites = ref(false);
  const errorFavorites = ref<string | null>(null);
  
  // function to get a joke
  const getJoke = () => {
    dataJokeStore.fetchRandomJoke()
  };
  const hasFavorites = computed(() => useUser().favorites.length > 0);

  // function to show favorites
  const showFavorites = () => {
    loadingFavorites.value = true;
    Promise.all(dataUserStore.getFavorites())
      .then((favorites:any[]) => {
        console.log(favorites);
        myFavorites.value = favorites;
      })
      .catch((error) => {
        errorFavorites.value = error.message;
      })
      .finally(() => {
        loadingFavorites.value = false;
      });
  
  }

  // computed properties
  const joke = computed(() => dataJokeStore.joke);
  const loading = computed(() => dataJokeStore.loading);
  const error = computed(() => dataJokeStore.error);
</script>

<style scoped>
.joke-box {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  place-items: center;
}

.details {
  flex: 1;
  margin-top: 2rem;
  min-height: 15vh;
  width: 100%;
  text-align: center;
}

.joke-actions {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 2rem;
  border: 1px solid var(--color-border);
  padding: 0.2rem 1rem;

    label {
      margin-right: 1rem;
    } 
}

.user-menu {
  margin-top: 2rem;
}

.favorite-jokes {
  padding-top: 3rem;
  padding-bottom: 1rem;
  margin-top: 2rem;
  border: 1px solid var(--color-border);
  width: 100%;
  text-align: center;

  .item {
    padding: 1rem 1rem 2rem 1rem;
    margin: 0.7rem 0;
    border-bottom: 1px solid var(--color-border);
    border-radius: 0.3rem;

    &:last-of-type {
      border-bottom: 0;
    }
  }
  
  h3 {
    text-align: center;
  }
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;

  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>