<template>
  <div class="star-rating">
    <h5></h5>
    <svg
      v-for="index in 5"
      :key="index"
      :class="{'filled': index <= rating}"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      @click="setRating(index)"
      @mouseover="hoverRating(index)"
      @mouseleave="resetRating"
    >
      <path
        d="M12 .587l3.668 7.431 8.207 1.179-5.92 5.771 1.399 8.152-7.354-3.866-7.355 3.866 1.4-8.152-5.92-5.771 8.206-1.179z"
        fill="currentColor"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { useUser } from '../stores/useUser';
  
  const rating = ref(0);       // Selected rating
  const tempRating = ref(0);   // Temporary rating
  
  const user = useUser();

  const props = defineProps<{
      jokeId: number;
  }>();

  const newJokeRating = ref(props.jokeId);
  
  // Set the rating value
  const setRating = (value: number) => {
      rating.value = value;
      const jokeRating = {
          id: props.jokeId,
          rating: value,
      };
      useUser().rateJoke(jokeRating);
  };
  
  // Handle the hover rating
  const hoverRating = (value: number) => {
      tempRating.value = value;
  };
  
  // Reset the rating value
  const resetRating = () => {
      tempRating.value = 0;
  };

  // Detect new joke rating
  watch(
      () => props.jokeId,
      (newId, oldId) => {
        if ( useUser().getJokeRating(newId) ) {
          rating.value = useUser().getJokeRating(props.jokeId);
        }else{
          rating.value = 0;
        }
      }
  );

</script>

<style scoped>
  .star-rating {
      display: flex;
      gap: 0.2rem;
      cursor: pointer;
      border: none;
  }
  
  svg {
      width: 1.3rem;
      height: 1.3rem;
      margin-top: 0.3rem;
      color: #ccc; /* Color for the stars */
      transition: color 0.2s;
  }
  
  svg.filled {
      color: #f5b301; /* Color for the filled stars */
  }
  
  svg:hover,
  svg.filled:hover ~ svg {
      color: #f5b301;
  }
</style>