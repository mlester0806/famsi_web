<script setup>
import { ref, reactive } from 'vue';
import { useAuthStore } from '@/store/useAuthStore';

definePageMeta({
  layout: 'verify-email',
});

const auth = useAuthStore();
const {params, query} = useRoute();

if(params.slug[0] && params.slug[1] && query?.expires && query?.signature) {
  const message = auth.checkEmailVerification({id: params.slug[0], token: params.slug[1], expires: query.expires, signature: query.signature});
} else {
 navigateTo('/login');
}

</script>

<template>
  <!-- <div class="bg-slate-100 h-screen z-50 absolute top-0 w-screen overflow-hidden flex items-center justify-center">
    <div class="flex items-center justify-center">
    <p class="text-3xl font-bold">Verifying Email Address...</p>
  </div>
  </div> -->
</template>


