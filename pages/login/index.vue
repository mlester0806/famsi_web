<script setup>
definePageMeta({
  layout: 'auth',
});
</script>

<template>
    <div class="w-full">
    <Head>
    <Title>FAMSI Website | Login</Title>
    <Meta name="description" />
  </Head>
      
  <NuxtLoadingIndicator />
  <AuthLoginPage />
</template>
