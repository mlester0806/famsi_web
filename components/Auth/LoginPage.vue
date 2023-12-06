<script setup>
import { ref, reactive } from 'vue';
import { useAuthStore } from '@/store/useAuthStore';
import { RecaptchaV2 } from "@imzdev/vue3-recaptcha-v2";

const handleWidgetId = (widgetId) => {
  console.log("Widget ID: ", widgetId);
};
const handleErrorCalback = () => {
  console.log("Error callback");
};
const handleExpiredCallback = () => {
  console.log("Expired callback");
};
const handleLoadCallback = (response) => {
  form.value.captcha_token = response;
};

const auth = useAuthStore();

const form = ref({
  email: '',
  password: '',
  captcha_token: ''
});

const errors = reactive({
  email: '',
  password: '',
  captcha_token: ''
});

const handleLogin = async () => {
  const { error } = await auth.login(form.value);

  if (error.value?.data?.error) {
    if (typeof error.value.data.error !== 'string') {
      if (error.value.data.error.email) {
        errors.email = error.value.data.error.email[0];
      } else {
        errors.email = '';
      }

      if (error.value.data.error.password) {
        errors.password = error.value.data.error.password[0];
      } else {
        errors.password = ''
      }

      if (error.value.data.error.captcha_token) {
        errors.captcha_token = error.value.data.error.captcha_token[0];
      } else {
        errors.captcha_token = '';
      }
    } else {
      errors.email = error.value.data.error;
      errors.password = '';
      errors.captcha_token = '';
    }
  } else {
    errors.email = '';
    errors.password = '';
    errors.captcha_token = '';
  }
};
</script>

<template>
  <!-- component -->
  <div class="min-h-screen flex justify-center items-center bg-white">
    <div
      class="p-10 border-[1px] sm:w-1/2 xl:w-[28rem] border-slate-200 rounded-md flex flex-col items-center space-y-3"
    >
      <div class="py-4">
        <NuxtLink to="/">
          <img class="w-28 xl:w-36" src="@/assets/img/logo/famsi_logo.png" />
        </NuxtLink>
      </div>

      <div class="pb-4">
        <h1 class="text-xl font-normal">Login your account.</h1>
      </div>

      <form class="w-full py-4" @submit.prevent="handleLogin">
        <div class="space-y-10">
        <div>
          <BaseInputField
            id="email"
            v-model="form.email"
            type="text"
            label="Email Address"
            placeholder="Email Address"
            :errors="errors?.email"
          />
        </div>

        <div>
          <BaseInputField
            id="password"
            v-model="form.password"
            type="password"
            label="Password"
            placeholder="Password"
            :errors="errors?.password"
          />
        </div>

        <div>
          <RecaptchaV2
            size="normal"
            @widget-id="handleWidgetId"
            @error-callback="handleErrorCalback"
            @expired-callback="handleExpiredCallback"
            @load-callback="handleLoadCallback"
          />
          <p class="text-red-500 text-sm mt-2" v-if="errors.captcha_token">
            {{ errors.captcha_token }}
          </p>
        </div>
      </div>

        <NuxtLink to="/forgot-password" class="flex ml-auto w-max mt-4 mb-6 text-sm">
          <p class="text-blue-500 hover:text-blue-700">
            Forgot Password?
          </p>
        </NuxtLink>

        <div class="flex flex-col space-y-5 w-full">
          <BaseButton
            type="submit"
            :disabled="auth.isLoading"
            class="px-8 xl:px-10 py-3 mt-2 text-white"
            :class="[
              auth.isLoading
                ? 'bg-gradient-to-r from-[#85a5ff] to-[#4b8dff] hover:shadow-none'
                : 'bg-gradient-to-r from-[#468ef9] to-[#0c66ee]',
            ]"
          >
            {{ auth.isLoading ? 'Loading...' : 'Log In' }}
          </BaseButton>
          <div
            class="flex items-center justify-center border-t-[1px] border-t-slate-300 w-full relative"
          >
            <div class="-mt-1 font-bod bg-white px-5 absolute">Or</div>
          </div>
          <NuxtLink to="/signup">
            <BaseButton
              type="button"
              class="px-8 w-full xl:px-10 py-3 mt-2 bg-inherit text-gradient border border-[#0c66ee]"
            >
              Sign Up
            </BaseButton>
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>
