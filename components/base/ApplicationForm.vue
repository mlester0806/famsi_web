<script setup>
import { ref, reactive, computed } from 'vue';
import { useAuthStore } from '@/store/useAuthStore';

const auth = useAuthStore();
const router = useRoute();

const details = ref({
  first_name: auth.user.applicant?.first_name || '',
  middle_name: auth.user.applicant?.middle_name || '',
  last_name: auth.user.applicant?.last_name || '',
  email: auth.user?.email || '',
  contact_number: auth.user.applicant?.contact_number || '',
});

const form = ref({
  resume_path: null,
  applicant_id: auth.user.applicant?.id || null,
  job_position_id: router.params.slug[0],
});

const errors = reactive({
  resume_path: '',
  first_name: '',
  last_name: '',
  email: '',
  contact_number: '',
});

const isAppliedAlready = computed(() => {
  return auth.user.applicant.applications.find(
    (el) => el.job_position_id == parseInt(router.params.slug[0])
  );
});

const checkApplications = computed(() => {
  return auth.user.applicant.applications.find(
    (el) => el.status === 1 || el.status === 2 || el.status === 3
  );
});

const applyJob = async () => {
  if (
    !form.value.resume_path ||
    !details.value.first_name ||
    !details.value.last_name ||
    !details.value.email ||
    !details.value.contact_number
  ) {
    if (!form.value.resume_path) {
      errors.resume_path = 'You need to upload your resume file.';
    } else {
      errors.resume_path = '';
    }

    if (!details.value.first_name) {
      errors.first_name = 'First Name field is required.';
    } else {
      errors.first_name = '';
    }

    if (!details.value.last_name) {
      errors.last_name = 'Last Name field is required.';
    } else {
      errors.last_name = '';
    }

    if (!details.value.email) {
      errors.email = 'Email Address field is required.';
    } else {
      errors.email = '';
    }

    if (!details.value.contact_number) {
      errors.contact_number = 'Contact Number field is required.';
    } else {
      errors.contact_number = '';
    }

    return;
  }
  await auth.application(form.value);
};
</script>

<template>
  <div class="w-full text-left text-md">
    <div>
      <h1 class="px-4 pb-4 text-blue-500 text-xl font-semibold">
        Please fill up the details below to proceed with your application.
      </h1>
      <form
        class="text-gray-700 w-full px-6 py-8 space-y-10 bg-white"
        @submit.prevent="applyJob"
      >
        <div>
          <BaseFileInput
            id="resume_path"
            v-model="form.resume_path"
            label="Upload Resume *"
            placeholder="Upload Resume"
            :errors="errors.resume_path"
          />
        </div>
        <div>
          <BaseInputField
            id="first_name"
            v-model="details.first_name"
            type="text"
            label="First Name *"
            placeholder="First Name"
            :disabled="true"
            :errors="errors.first_name"
          />
        </div>

        <div>
          <BaseInputField
            id="middle_name"
            v-model="details.middle_name"
            type="text"
            label="Middle Name (Optional)"
            placeholder="Middle Name (Optional)"
            :disabled="true"
          />
        </div>

        <div>
          <BaseInputField
            id="last_name"
            v-model="details.last_name"
            type="text"
            label="Last Name *"
            placeholder="Last Name"
            :disabled="true"
            :errors="errors.last_name"
          />
        </div>

        <div>
          <BaseInputField
            id="email"
            v-model="details.email"
            type="text"
            label="Email Address *"
            placeholder="Email Address"
            :disabled="true"
            :errors="errors.email"
          />
        </div>

        <div>
          <BaseInputField
            id="contact_number"
            v-model="details.contact_number"
            type="text"
            label="Contact Number *"
            placeholder="Contact Number"
            :disabled="true"
            :errors="errors.contact_number"
          />
        </div>

        <div class="flex flex-col space-y-5 w-full">
          <BaseButton
            v-if="isAppliedAlready"
            disabled
            class="px-8 xl:px-10 py-3 mt-2 text-white bg-gray-600 hover:shadow-none"
          >
            You've already applied to this job
          </BaseButton>
          <BaseButton
            v-else-if="checkApplications"
            disabled
            class="px-8 xl:px-10 py-3 mt-2 text-white bg-gray-600 hover:shadow-none"
          >
            You've already applied for a job
          </BaseButton>
          <BaseButton
            v-else
            type="submit"
            :disabled="auth.isLoading"
            class="px-8 xl:px-10 py-3 mt-2 text-white"
            :class="[
              auth.isLoading
                ? 'bg-gradient-to-r from-[#85a5ff] to-[#4b8dff] hover:shadow-none'
                : 'bg-gradient-to-r from-[#468ef9] to-[#0c66ee]',
            ]"
          >
            {{ auth.isLoading ? 'Loading...' : 'Apply Now' }}
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>
