<script>
import aosMixin from '@/mixins/aos';
export default {
  mixins: [aosMixin],
};
</script>

<template>
  <div class="w-full">
    <Head>
    <Title>FAMSI Website</Title>
    <Meta name="description" />
  </Head>
    
    <!-- Hero section -->
    <LandingWelcome />

    <!-- Requirements section -->
    <LandingRequirements />

    <!-- Introduction section -->
    <LandingShortIntroduction />

    <!-- Getting started section -->
    <LandingCurrentOpenings />

        <!-- Visit office section -->
        <LandingVisitOffice />

  </div>
</template>

<style scoped>
.max-h-0 {
  max-height: 0;
}
</style>
