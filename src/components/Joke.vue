<template>
    <div class="joke">
        <h4 class="setup">{{ joke.setup }}</h4>
        <h4 class="punchline">{{ joke.punchline }}</h4>
        <div class="favorite-rating" v-if="joke.rating">
            <StarRating :rating="joke.rating" />
        </div>
        <h5 class="type"><span>{{ joke.type }}</span></h5>
    </div>
</template>

<style scoped>
    .joke {
      text-align: center;

      .setup {
        font-size: 1.4rem;
        font-weight: 500;
        margin-bottom: 0.4rem;
        color: var(--color-green);
      }

      .favorite-rating {
        margin-top: 1rem;
      }

      .punchline {
        font-size: 1.4rem;
        font-weight: 400;
        color: var(--color-blue);
      }

        .type {
            font-size: 0.7rem;
            margin-top: 0.5rem;
            text-transform: uppercase;
            width: auto;

            span {
                font-size: 0.6rem;
                background-color: #efefef !important;
                color: var(--vt-c-divider-dark-1);
                border-radius: 0.2rem;
                padding: 0.15rem 0.4rem;
            }
        }
    }
</style>

<script setup lang="ts">
    import { defineProps } from 'vue';
    import StarRating from './StarRating.vue';

    const props = defineProps<{
        joke: {
            rating: any;
            setup: string;
            punchline: string;
        };
    }>();
</script>