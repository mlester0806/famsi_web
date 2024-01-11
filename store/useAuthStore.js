import { defineStore } from 'pinia';
import { useApiFetch } from '~/composables/useApiFetch';
import nuxtStorage from 'nuxt-storage';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isLoading = ref(false);

  const fetchUser = async () => {
    const token = nuxtStorage.localStorage.getData('Token');

    if (token) {
      try {
        const { data } = await useApiFetch('/api/user', {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });

        user.value = data.value;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  const logout = async () => {
    isLoading.value = true;
    await useApiFetch('/logout', { method: 'POST' });
    user.value = null;
    nuxtStorage.localStorage.setData('Token', null);

    isLoading.value = false;
    navigateTo('/login');
  };

  const login = async (credentials) => {
    isLoading.value = true;
    await useApiFetch('/sanctum/csrf-cookie');

    const loginResponse = await useApiFetch('/api/login', {
      method: 'POST',
      body: credentials,
    });

    if (loginResponse.error?.value?.data?.error === 'You need to verify your email first.') {
      isLoading.value = false;

      return navigateTo('/verify-email');
    }

    if (loginResponse.data?.value?.token) {
      const { data } = await useApiFetch('/api/user', {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + loginResponse.data.value.token,
        },
      });

      nuxtStorage.localStorage.setData(
        'Token',
        loginResponse.data.value.token,
        300
      );

      user.value = data.value;

      isLoading.value = false;

      return navigateTo('/portal');
    }

    isLoading.value = false;

    return loginResponse;
  };

    const googleLogin = async (credentials) => {
    isLoading.value = true;
    await useApiFetch("/sanctum/csrf-cookie");

    console.log(credentials);

    const loginResponse = await useApiFetch("/api/google-login", {
      method: "POST",
      body: credentials,
    });

    if (
      loginResponse.error?.value?.data?.error ===
      "You need to verify your email first."
    ) {
      isLoading.value = false;

      return navigateTo("/verify-email");
    }

    if (loginResponse.data?.value?.token) {
      const { data } = await useApiFetch("/api/user", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + loginResponse.data.value.token,
        },
      });

      nuxtStorage.localStorage.setData(
        "Token",
        loginResponse.data.value.token,
        300
      );

      user.value = data.value;

      isLoading.value = false;

      return navigateTo("/portal");
    }

    isLoading.value = false;

    return loginResponse;
  };

  const verifyEmail = async (credentials) => {
    isLoading.value = true;
    await useApiFetch('/sanctum/csrf-cookie');

    const verifyEmailResponse = await useApiFetch('/api/verify-email', {
      method: 'POST',
      body: credentials,
    });

    isLoading.value = false;

    return verifyEmailResponse;
  };

  const verifyForgotPass = async (credentials) => {
    isLoading.value = true;
    await useApiFetch('/sanctum/csrf-cookie');

    const verifyForgotPassResponse = await useApiFetch('/api/verify-forgot-pass', {
      method: 'POST', 
      body: credentials,
    });

    isLoading.value = false;

    return verifyForgotPassResponse;
  };

  const resetPass = async (credentials) => {
    isLoading.value = true;
    await useApiFetch('/sanctum/csrf-cookie');

    const resetPassResponse = await useApiFetch('/api/reset-pass', {
      method: 'PATCH', 
      body: credentials,
    });

    console.log(resetPassResponse);

    if (!resetPassResponse.error?.value?.data?.error) {
      isLoading.value = false;

      return navigateTo('/login');
    }

    isLoading.value = false;

    return resetPassResponse;
  };

  const checkEmailVerification = async (credentials) => {
    isLoading.value = true;
    await useApiFetch('/sanctum/csrf-cookie');

    const verifyEmailResponse = await useApiFetch('/api/check-email-verification', {
      method: 'POST',
      body: credentials,
    });

    if(verifyEmailResponse?.error?.value?.data?.message === "Email verification link has expired.") {
      nuxtStorage.localStorage.setData('verification-message', "Email verification link has expired.");
      
      return navigateTo('/login');
    }

    if (verifyEmailResponse?.data?.value?.token) {
      const { data } = await useApiFetch('/api/user', {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + verifyEmailResponse.data.value.token,
        },
      });

      nuxtStorage.localStorage.setData(
        'Token',
        verifyEmailResponse.data.value.token,
        300
      );

      user.value = data.value;

      return navigateTo('/portal');
    }

    isLoading.value = false;

    return verifyEmailResponse;
  };


  const register = async (info) => {
    isLoading.value = true;
    await useApiFetch('/sanctum/csrf-cookie');

    const registerResponse = await useApiFetch('/api/register', {
      method: 'POST',
      body: info,
    });

    // if (registerResponse.data?.value?.token) {
    //   const { data } = await useApiFetch('/api/user', {
    //     headers: {
    //       Accept: 'application/json',
    //       Authorization: 'Bearer ' + registerResponse.data.value.token,
    //     },
    //   });

    //   nuxtStorage.localStorage.setData(
    //     'Token',
    //     registerResponse.data.value.token,
    //     300
    //   );

    //   user.value = data.value;

      
    // }

    isLoading.value = false;

    return navigateTo('/verify-email');
  };

  const application = async (val) => {
    let hostedBackend = 'https://famsi-dashboard.tech';
    let localBackend = 'http://127.0.0.1:8000';
    
    isLoading.value = true;

    const formData = new FormData();
    formData.append('resume_path', val.resume_path);
    formData.append('applicant_id', val.applicant_id);
    formData.append('job_position_id', val.job_position_id);

    try {
      const { data, error } = await useFetch(
        hostedBackend + '/api/application',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (data) {
        isLoading.value = false;

        return navigateTo('/portal');
      }

      return error;
    } catch (error) {
      isLoading.value = false;
      return error;
    }
  };

  const uploadRequirements = async (val, details) => {
    let hostedBackend = 'https://famsi-dashboard.tech';
    let localBackend = 'http://127.0.0.1:8000';
    
    // isLoading.value = true;
    const formData = new FormData();

    val.forEach((item, index) => {
      Object.keys(item).forEach((key) => {
        formData.append(`${key}_${index + 1}`, item[key]);
      });
    });

    formData.append('applicant_id', details.applicant_id);
    formData.append('job_position_id', details.job_position_id);

    try {
      const { data, error } = await useFetch(
        hostedBackend + '/api/upload-requirements',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (data) {
        isLoading.value = false;

        window.location.reload();
      }

      return error;
    } catch (error) {
      console.log(error);
      isLoading.value = false;
      return error;
    }
  };

  return { user, isLoading, login, googleLogin, verifyEmail, verifyForgotPass, resetPass, checkEmailVerification, logout, register, application, uploadRequirements, fetchUser };
});
