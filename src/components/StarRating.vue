<template>
    <div class="star-rating">
      <svg
        v-for="index in rating"
        :key="index"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="#f5b301"
        class="star"
      >
        <path
          d="M12 .587l3.668 7.431 8.207 1.179-5.92 5.771 1.399 8.152-7.354-3.866-7.355 3.866 1.4-8.152-5.92-5.771 8.206-1.179z"
        />
      </svg>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  // Define the props
  const props = defineProps({
    rating: {
      type: Number,
      required: true
    }
  });
  </script>
  
<style scoped>
    svg {
        width: 1.2rem;
        height: 1.2rem;
    }

    .favorite-rating {
        margin-top: 1rem;
    }
</style>