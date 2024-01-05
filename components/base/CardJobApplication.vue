<script setup>
import { computed } from 'vue';

const props = defineProps({
  details: Object,
  relatedJobs: Array,
});

const date = new Date(props.details.created_at);
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
const day = String(date.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;

const slug = props.details.title
  .toLowerCase()
  .replaceAll(' ', '-')
  .replaceAll('.', '')
  .replaceAll('/', '-');
const readMore = `/portal/job/${props.details.id}/${slug}`;

const route = useRoute();

const hostedUrl = 'https://famsi-web.site';
const localhostUrl = 'http://localhost:3000/';

const currentPageUrl = `${hostedUrl}${route.fullPath}`;

const twitterUrl = computed(() => {
  return `https://twitter.com/intent/tweet?url=${currentPageUrl}`;
});

const facebookUrl = computed(() => {
  return `https://www.facebook.com/sharer.php?u=${currentPageUrl}`;
});

const emailUrl = computed(() => {
  return `mailto:?subject=${currentPageUrl}`;
});

const linkedinUrl = computed(() => {
  return `https://www.linkedin.com/shareArticle?url=${currentPageUrl}`;
});

const portalUrl = computed(() => {
  return `${hostedUrl}/portal`;
});

const filterIndustryUrl = computed(() => {
  return `${hostedUrl}/portal?industry=${props.details.industry.title}`;
});

const relatedJobLink = (id, title) => {
  return `${hostedUrl}/portal/job/${id}/${title
    .toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll('.', '')
    .replaceAll('/', '-')}`;
};
</script>

<template>
  <div class="text-white py-5 px-5">
    <div class="flex flex-wrap -mx-3">
      <BaseBreadCrumbs home="Jobs" :homeLink="portalUrl" :currentPage="details.title" :currentPageLink="currentPageUrl" />
      <div class="w-full sm:w-1/2 md:w-2/3 px-3 text-left space-y-4">
        <div class="p-5 xl:px-8 md:py-5 space-y-2 bg-white shadow-xl">
          <div class="w-full text-left text-md text-gray-700">
            <div class="flex items-center border-t-2 border-gray-200">
              <div class="md:w-1/2 font-semibold">
                <p class="py-2">Job Title:</p>
              </div>

              <div class="w-full">
                <p class="px-4 py-2 font-semibold text-blue-500">
                  {{ details.title }}
                </p>
              </div>
            </div>

            <div class="flex items-center border-t-2 border-gray-200">
              <div class="md:w-1/2 font-semibold">
                <p class="py-2">Job Type:</p>
              </div>

              <div class="w-full">
                <p class="px-4 py-2">{{ details.job_type.title }}</p>
              </div>
            </div>

            <div class="flex items-center border-t-2 border-gray-200">
              <div class="md:w-1/2 font-semibold">
                <p class="py-2">Employee Type:</p>
              </div>

              <div class="w-full">
                <p class="px-4 py-2">{{ details.employee_type.title }}</p>
              </div>
            </div>

            <div class="flex items-center border-t-2 border-gray-200">
              <div class="md:w-1/2 font-semibold">
                <p class="py-2">Industry:</p>
              </div>

              <div class="w-full">
                <div class="px-4 py-2">
                  <a :href="filterIndustryUrl" class="bg-blue-400 px-3 py-1 rounded-lg text-white hover:underline">{{
                    details.industry.title }}</a>
                </div>
              </div>
            </div>

            <div class="flex items-center border-t-2 border-gray-200">
              <div class="md:w-1/2 font-semibold">
                <p class="py-2">Location:</p>
              </div>

              <div class="w-full">
                <p class="px-4 py-2">{{ details.location }}</p>
              </div>
            </div>

            <div class="flex items-center border-t-2 border-gray-200">
              <div class="md:w-1/2 font-semibold">
                <p class="py-2">Job Published:</p>
              </div>

              <div class="w-full">
                <p class="px-4 py-2">{{ formattedDate }}</p>
              </div>
            </div>

            <div class="flex items-center border-t-2 border-gray-200">
              <div class="md:w-1/2 font-semibold">
                <p class="py-2">Job ID:</p>
              </div>

              <div class="w-full">
                <p class="px-4 py-2">{{ details.id }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-5 xl:px-8 md:py-5 space-y-4 bg-white shadow-xl">
          <div>
            <h3 class="text-2xl font-semibold text-black hover:text-blue-600 hover:text-underline">
              Job Description
            </h3>

            <p class="text-md text-black leading-relaxed">
              {{ details.description }}
            </p>
          </div>

          <div class="text-black" v-html="details.company_profile"></div>

          <div class="text-black space-y-2">
            <div class="flex items-center space-x-2">
              <p class="font-bold">Job type:</p>
              <p>{{ details.job_type.title }}</p>
            </div>

            <div class="flex items-center space-x-2">
              <p class="font-bold">Location:</p>
              <p>{{ details.location }}</p>
            </div>

            <div class="flex items-center space-x-2">
              <p class="font-bold">Industry:</p>
              <p>{{ details.industry.title }}</p>
            </div>

            <div class="flex items-center space-x-2">
              <p class="font-bold">Schedule:</p>
              <p>{{ details.schedule }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full sm:w-1/2 md:w-1/3 px-3 text-center space-y-6">
        <div class="w-full text-left text-md">
          <BaseApplicationForm />
        </div>
      </div>
    </div>
  </div>
</template>
