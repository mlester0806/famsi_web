<script setup>
import { ref, reactive } from 'vue';
import { useAuthStore } from '@/store/useAuthStore';

definePageMeta({
  layout: 'verify-pass',
});

const auth = useAuthStore();
const {params, query} = useRoute();

if(!params.slug[0] && !query?.email) {
  navigateTo('/login');
} 

</script>

<template>
      <Head>
    <Title>FAMSI Reset Password</Title>
    <Meta name="description" />
  </Head>
    <NuxtLoadingIndicator />
  <AuthResetPassPage />
</template>


