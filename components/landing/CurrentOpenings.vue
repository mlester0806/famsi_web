<script setup>
import { useLandingPageStore } from '@/store/useLandingPageStore';
import { storeToRefs } from 'pinia';

const store = useLandingPageStore();
const { currentOpenings, jobPositions } = storeToRefs(store);
</script>

<template>
  <section
    id="landing-openings"
    class="bg-trading-tools relative max-w-full sm:mx-4 xl:mx-10 my-24 shadow sm:rounded-2xl overflow-hidden"
  >
    <div class="w-full py-16 flex flex-col items-center">
      <h2
        data-aos="flip-down"
        class="text-3xl sm:text-4xl font-semibold text-center mb-8"
      >
        {{ currentOpenings.title }}
      </h2>
      <div
        data-aos="fade-up"
        class="grid grid-cols-3 w-full px-4 xl:px-10"
      >
        <LandingPositions :positions="jobPositions"  />
      </div>
    </div>
  </section>
</template>
