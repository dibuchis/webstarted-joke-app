<template>
    <div @click="toggleFavorite" class="favorite-button">
      <svg
        :class="{ favorite: isFavorite, 'heart-beat': isAnimating }"
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="currentColor"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useUser } from '@/stores/useUser';
  
  const props = defineProps<{
      jokeId: number;
  }>();
  
  // Favorite state and animation
  const isFavorite = ref(false);
  const isAnimating = ref(false);
  
  // Switch favorite state
  const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;
    isAnimating.value = true;
  
    // Search for the joke in the user's favorites
    const jokeExists = useUser().checkFavorite({ id: props.jokeId });

    if (jokeExists) {
      // Remove the joke from the favorites
      useUser().removeFavorite({ id: props.jokeId });
    } else {
      // Add the joke to the favorites
      useUser().addFavorite({ id: props.jokeId });
    }
  
    // Deactivate the animation
    setTimeout(() => {
      isAnimating.value = false;
    }, 300);
  };
  
  // Watch for changes in the ID
  watch(
    () => props.jokeId,
    () => {
      isFavorite.value = false;
      isAnimating.value = false;
    }
  );
  </script>
  
  <style scoped>
  .favorite-button {
    cursor: pointer;
    display: inline-block;
  }
  
  svg {
    width: 35px;
    height: 35px;
    margin-top: 1rem;
    transition: transform 0.3s ease, color 0.3s ease;
    color: #ccc; /* Color predeterminado del icono */
  }
  
  svg.favorite {
    color: #ff0000; /* Color rojo cuando está marcado como favorito */
  }
  
  .heart-beat {
    transform: scale(1.3); /* Efecto de "latido" (zoom) */
  }
  </style>
  