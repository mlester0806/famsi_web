<script setup>
import { useLandingPageStore } from '@/store/useLandingPageStore';
import { storeToRefs } from 'pinia';

const store = useLandingPageStore();
const { visitOffice } = storeToRefs(store);
</script>

<template>
  <section
    class="bg-trading-tools relative max-w-full sm:mx-4 my-20 py-16 shadow rounded-2xl overflow-hidden"
  >
    <div
      class="relative max-w-screen-xl px-4 sm:px-2 mx-auto grid grid-cols-12 gap-x-6"
    >
      <LandingTradingToolImage class="sm:hidden" />
      <div
        data-aos="fade-right"
        class="col-span-12 lg:col-span-6 space-y-12 sm:space-y-6 px-4 sm:px-6 mt-8"
      >
        <h2 class="text-4xl font-semibold">
          {{ visitOffice.title }}
          <span class="text-header-gradient">{{
            visitOffice.highlightedTitle
          }}</span>
          {{ visitOffice.remainingTitle }}
        </h2>
        <LandingOffices :offices="visitOffice.offices" />
      </div>
      <LandingGoogleMapPin data-aos="fade-left" class="hidden sm:block" />
    </div>
  </section>
</template>

<style scoped>
.text-header-gradient {
  background: rgb(59, 180, 77);
  background: linear-gradient(
    169.4deg,
    #3bb44d -6.01%,
    #0db865 36.87%,
    #2ea978 78.04%,
    #0dbf6f 103.77%
  );
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
