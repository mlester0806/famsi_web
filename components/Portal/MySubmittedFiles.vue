<script setup>
import { useMyApplicationsStore } from '@/store/useMyApplicationsStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useLandingPageStore } from '@/store/useLandingPageStore';
import { ref, watch, reactive } from 'vue';

const applications = useMyApplicationsStore();

let additionalFiles;
let famsiFiles;

if (applications.allJobApplications.length !== 0) {
  additionalFiles = JSON.parse(applications.allJobApplications[applications.allJobApplications.length - 1]?.additional_files);
  famsiFiles = JSON.parse(applications.allJobApplications[applications.allJobApplications.length - 1]?.famsi_files);
}

const form = reactive([
  {
    file_name: null,
    file_path: null,
  }
]);

const famsiForm = reactive([
  {
    file_name: null,
    file_path: null,
  }
]);

let fileCount = 1;
let famsiFileCount = 1;
let additionalFilesObj = {};
let famsiFilesObj = {};

if (applications.allJobApplications.length !== 0) {

  if (additionalFiles) {

    Object.keys(additionalFiles).forEach((key) => {
      if (fileCount === 1) {
        form.length = 0;
      }

      if (key.includes('file_name')) {
        additionalFilesObj.file_name = additionalFiles[key]
      }

      if (key.includes('file_path')) {
        additionalFilesObj.file_path = additionalFiles[key]
      }

      if (fileCount % 2 === 0) {
        form.push(additionalFilesObj);

        additionalFilesObj = {};
      }

      fileCount++;
    });
  }

  if (famsiFiles) {
    Object.keys(famsiFiles).forEach((key) => {
      if (famsiFileCount === 1) {
        famsiForm.length = 0;
      }

      if (key.includes('file_name')) {
        famsiFilesObj.file_name = famsiFiles[key]
      }

      if (key.includes('file_path')) {
        famsiFilesObj.file_path = famsiFiles[key]
      }

      if (famsiFileCount % 2 === 0) {
        famsiForm.push(famsiFilesObj);

        famsiFilesObj = {};
      }

      famsiFileCount++;
    });
  }
}

const { user } = useAuthStore();

const landingPage = useLandingPageStore();

const showAdvancedFilters = ref(false);

const toggleAdvancedFilters = () => {
  showAdvancedFilters.value = !showAdvancedFilters.value;
};
</script>

<template>
  <BaseImageCarousel id="imageCarousel" />
  <div class="flex flex-col py-8 mx-auto max-w-6xl justify-center items-center space-y-0.5">
    <div class="bg-white shadow-xl text-white py-2 px-2 w-full">
      <div class="flex flex-wrap -mx-3">
        <h1 v-if="form?.length > 0 && form[0]?.file_name" class="text-xl font-bold text-gray-800 py-4 px-6">All Uploaded
          Files</h1>
        <div v-if="form?.length > 0 && form[0]?.file_name" class="w-full px-8 text-left">
          <div v-for="(file, index) in form" :key="file.id" class="flex items-center gap-2 p-5 xl:px-0 md:py-3">
            <h1 class="text-md text-gray-800">{{ index + 1 }}: {{ file.file_name }}:</h1>
            <a :href="file.file_path" class="text-blue-500 hover:text-blue-600">{{ file.file_path }}</a>
          </div>
        </div>
        <div v-else class="w-full px-3 text-center">
          <div class="p-5 xl:px-0 md:py-5 space-y-2">
            <h1 class="text-xl text-gray-800">No Files found 😰</h1>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3">
        <h1 v-if="famsiForm?.length > 0 && famsiForm[0]?.file_name" class="text-xl font-bold text-gray-800 py-4 px-6">All
          Famsi
          Files</h1>
        <div v-if="famsiForm?.length > 0 && famsiForm[0]?.file_name" class="w-full px-8 text-left">
          <div v-for="(file, index) in famsiForm" :key="file.id" class="flex items-center gap-2 p-5 xl:px-0 md:py-3">
            <h1 class="text-md text-gray-800">{{ index + 1 }}: {{ file.file_name }}:</h1>
            <a :href="file.file_path" class="text-blue-500 hover:text-blue-600">{{ file.file_path }}</a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
