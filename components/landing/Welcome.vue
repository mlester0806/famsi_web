<script setup>
import { useLandingPageStore } from '@/store/useLandingPageStore';
import { storeToRefs } from 'pinia';

const store = useLandingPageStore();
const { welcome } = storeToRefs(store);
</script>

<template>
  <section id="hero" class="w-full pb-24">
    <BaseSection>
      <div
        class="col-span-12 lg:col-span-6 mt-12 xl:mt-10 space-y-4 sm:space-y-6 px-6 text-center sm:text-left"
      >
        <span
          data-aos="fade-right"
          data-aos-once="true"
          class="text-base text-green-500 font-semibold uppercase tracking-wider"
          >{{ welcome.shortTitle }}</span
        >
        <h1
          data-aos="fade-right"
          data-aos-once="true"
          class="text-[2.5rem] sm:text-5xl xl:text-6xl font-bold leading-tight capitalize sm:pr-8 xl:pr-10"
        >
          {{ welcome.title }}
          <span class="text-header-gradient">{{
            welcome.highlightedTitle
          }}</span>
          {{ welcome.remainingTitle }}
        </h1>
        <p
          data-aos="fade-down"
          data-aos-once="true"
          data-aos-delay="300"
          class="paragraph hidden sm:block"
        >
          {{ welcome.description }}
        </p>
        <div
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-delay="700"
          class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-2"
        >
          <BaseLink
            href="#landing-requirements"
            class="max-w-full px-8 py-4 bg-gradient-to-r from-[#468ef9] to-[#0c66ee] border border-[#0c66ee] text-white"
          >
            <div class="flex items-center gap-2">
              Get Started
              <IconBottomArrow size="20" />
            </div>
          </BaseLink>
          <BaseLink
            href="#landing-openings"
            class="max-w-full px-6 py-4 bg-inherit text-[#0c66ee] border border-[#0c66ee] flex items-center justify-center"
          >
            <div class="flex items-center gap-1">
              View Openings
              <IconRightArrow size="20" />
            </div>
          </BaseLink>
        </div>
      </div>
      <div class="hidden sm:block col-span-12 lg:col-span-6">
        <div class="w-full">
          <img
            data-aos="fade-up"
            data-aos-once="true"
            src="@/assets/img/famsi_poster1.png"
            class="-mt-4"
            alt=""
          />
        </div>
      </div>
    </BaseSection>
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
