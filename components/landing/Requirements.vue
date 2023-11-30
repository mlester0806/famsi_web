<script setup>
import { useLandingPageStore } from '@/store/useLandingPageStore';
import { storeToRefs } from 'pinia';

const store = useLandingPageStore();
const { qualifications, benefits, companyAssignments } = storeToRefs(store);
</script>

<template>
  <section
    id="landing-requirements"
    class="max-w-screen-xl mx-2 sm:mx-auto px-4 sm:px-6 lg:px-0 py-6 pb-20 sm:py-8 rounded-[2.25rem] sm:rounded-xl bg-white shadow-lg sm:shadow-md transform lg:-translate-y-12"
  >
    <div class="w-full flex flex-col lg:flex-row items-center justify-center">
      <LandingAttributes
        data-aos="fade-up"
        title="✔️ Qualifications"
        :datasets="qualifications"
        class="xl:border-r border-gray-200 lg:px-8"
      />
      <LandingAttributes
        data-aos="fade-up"
        data-aos-delay="150"
        title="🥰 Benefits"
        :datasets="benefits"
        class="xl:border-r border-gray-200 lg:px-8"
      />
      <LandingAttributes
        data-aos="fade-up"
        data-aos-delay="300"
        title="📌 Company Assignments Location"
        :datasets="companyAssignments"
        class="lg:px-8"
      />
    </div>
  </section>
</template>
