<script setup>
import { ref, reactive } from 'vue';
import { useAuthStore } from '@/store/useAuthStore';

const auth = useAuthStore();

const form = ref({
  email: '',
});

const errors = reactive({
  email: '',
});

const success = reactive({
  email: '',
});

const handleVerifyEmail = async () => {
  const message = await auth.verifyEmail(form.value);

  if (message?.error?.value?.data?.message) {
      errors.email = message.error.value.data.message;
      success.email = '';
  } else if (message?.data?.value?.message) {
    success.email = message.data.value.message;
    errors.email = '';
  }else {
    errors.email = '';
    success.email = '';
  }
};
</script>

<template>
  <!-- component -->
  <div class="min-h-screen flex justify-center items-center bg-white">
    <div
      class="p-10 border-[1px] sm:w-1/2 xl:w-[32rem] border-slate-200 rounded-md flex flex-col items-center space-y-3"
    >
      <div class="py-4">
        <NuxtLink to="/">
          <img class="w-28 xl:w-36" src="@/assets/img/logo/famsi_logo.png" />
        </NuxtLink>
      </div>

        <h1 class="text-xl font-normal">Please verify your email.</h1>

        <h1 class="text-sm font-normal text-gray-600">Before accessing the job portal, could you verify your email address first by inputting your registered email address?</h1>


      <form class="w-full py-4 space-y-10" @submit.prevent="handleVerifyEmail">
        <div>
          <BaseInputField
            id="email"
            v-model="form.email"
            type="text"
            label="Email Address"
            placeholder="Email Address"
            :errors="errors?.email"
            :success="success?.email"
          />
        </div>

        <div class="flex flex-col space-y-5 w-full">
          <BaseButton
            type="submit"
            :disabled="auth.isLoading"
            class="px-8 xl:px-10 py-3 text-white"
            :class="[
              auth.isLoading
                ? 'bg-gradient-to-r from-[#85a5ff] to-[#4b8dff] hover:shadow-none'
                : 'bg-gradient-to-r from-[#468ef9] to-[#0c66ee]',
            ]"
          >
            {{ auth.isLoading ? 'Loading...' : 'Send Verification Email' }}
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>
