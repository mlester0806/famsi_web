<script setup>
import { ref, reactive } from 'vue';
import { useAuthStore } from '@/store/useAuthStore';

const auth = useAuthStore();

const {params, query} = useRoute();

const form = ref({
  email: query?.email,
  newPass: '',
  confirmNewPass: ''
});

const errors = reactive({
  email: '',
  newPass: '',
  confirmNewPass: ''
});

const success = reactive({
  email: '',
  newPass: '',
  confirmNewPass: ''
});

const handleResetPass = async () => {
  const message = await auth.resetPass(form.value);

  if (message?.error?.value?.data?.message) {
      errors.email = message.error.value.data.message;
      errors.newPass = '';
      errors.confirmNewPass = '';
      success.email = '';
  } else if (form?.value.newPass.length < 8 && form?.value.confirmNewPass.length < 8 && form?.value.newPass.length !== 0) {
    errors.newPass = 'Minimum of 8 characters.'
    errors.confirmNewPass = 'Minimum of 8 characters.'
    errors.email = '';
  } else if (form?.value.newPass.length < 8) {
    errors.newPass = 'Minimum of 8 characters.'
    errors.confirmNewPass = '';
    errors.email = '';
  } else if (form?.value.confirmNewPass.length < 8) {
    errors.newPass = ''
    errors.confirmNewPass = 'Minimum of 8 characters.';
    errors.email = '';
  } else if (form?.value.newPass !== form?.value.confirmNewPass) {
    errors.newPass = 'Password does not match.';
    errors.confirmNewPass = '';
    errors.email = '';
  }else {
    errors.email = '';
    errors.newPass = '',
    errors.confirmNewPass = '';
    success.email = '';
    success.newPass = '';
    success.confirmNewPass = '';
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

        <h1 class="text-xl font-normal">Reset Password</h1>

      <form class="w-full py-4 space-y-10" @submit.prevent="handleResetPass">
        <div>
          <BaseInputField
            id="email"
            v-model="form.email"
            type="text"
            label="Email Address"
            placeholder="Email Address"
            :errors="errors?.email"
            :success="success?.email"
            disabled
          />
        </div>
        <div>
          <BaseInputField
            id="newPass"
            v-model="form.newPass"
            type="password"
            label="New Password"
            placeholder="New Password"
            :errors="errors?.newPass"
            :success="success?.newPass"
          />
        </div>
        <div>
          <BaseInputField
            id="confirmNewPass"
            v-model="form.confirmNewPass"
            type="password"
            label="Confirm New Password"
            placeholder="Confirm New Password"
            :errors="errors?.confirmNewPass"
            :success="success?.confirmNewPass"
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
            {{ auth.isLoading ? 'Loading...' : 'Reset Password' }}
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>
