<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/useAuthStore';

const store = useAuthStore();

const settingsModalVisibility = ref(false);

onClickOutside(
  settingsModalVisibility,
  (event) => (settingsModalVisibility.value = false)
);

const handleLogout = async () => {
  await store.logout();
};

const handleSettingsModal = () => {
  settingsModalVisibility.value = !settingsModalVisibility.value;
};
</script>

<template>
  <!-- Main navigation container -->

  <section class="relative mx-auto">
    <!-- navbar -->
    <nav class="flex justify-between text-gray-600">
      <div class="px-5 xl:px-12 py-2 flex w-full items-center">
        <a class="text-3xl font-bold font-heading mr-auto" href="/portal">
          <img
            src="@/assets/img/logo/famsi_logo.png"
            class="w-24 xl:w-28"
            alt="FAMSI Logo"
          />
        </a>
        <!-- Header Icons -->
       <div class="relative xl:flex space-x-5 items-center">
        <p class="font-semibold text-md text-black">{{ store.user.applicant.first_name }} {{ store.user.applicant.last_name }}</p>
          <!-- Sign In / Register      -->
          <button
            @click="handleSettingsModal"
            class="flex items-center hover:text-gray-800"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 hover:text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          <div
            v-show="settingsModalVisibility"
            class="absolute right-0 w-48 z-50 bg-white rounded-md shadow-lg top-8 ring-1 ring-black ring-opacity-5 dark:bg-dark focus:outline-none"
            tabindex="-1"
            role="menu"
            aria-orientation="vertical"
            aria-label="User menu"
          >
            <a href="/portal/my-applications">
              <button
                class="block px-4 w-full py-3 text-sm text-gray-700 text-left transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-blue-600"
              >
                My Applications
              </button>
            </a>

                        <a href="/portal/my-submitted-files">
              <button
                class="block px-4 w-full py-3 text-sm text-gray-700 text-left transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-blue-600">
                My Submitted Files
              </button>
            </a>

            <a href="/portal/my-profile">
              <button
                class="block px-4 w-full py-3 text-sm text-gray-700 text-left transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-blue-600"
              >
                My Profile
              </button>
            </a>
            <form @submit.prevent="handleLogout">
              <button
                type="submit"
                class="block px-4 rounded-md w-full py-3 text-sm text-red-600 text-left transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-blue-600"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  </section>
</template>
<script>
export default {
  name: 'BaseNavbar',
  data() {
    return {
      open: false,
      dropdownNavbar: false,
    };
  },
  methods: {
    dropdownToggler() {
      this.dropdownNavbar = !this.dropdownNavbar;
    },
  },
};
</script>
