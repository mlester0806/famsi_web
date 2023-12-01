<script setup>
import { useMainPortalStore } from '@/store/useMainPortalStore';
import { useLandingPageStore } from '@/store/useLandingPageStore';
import { useMyApplicationsStore } from '@/store/useMyApplicationsStore';
import { ref, watch } from 'vue';

const portal = useMainPortalStore();
const landingPage = useLandingPageStore();
const applications = useMyApplicationsStore();

const showAdvancedFilters = ref(false);

const toggleAdvancedFilters = () => {
  showAdvancedFilters.value = !showAdvancedFilters.value;
};
</script>

<template>
  <BaseImageCarousel id="imageCarousel" />

  <div
    class="flex py-8 mx-auto max-w-6xl justify-center items-center space-x-8"
  >
    <BaseSearchBar
      id="searchJob"
      v-model="portal.filter.search"
      label="search"
      placeholder="Search for Job Title..."
    />

    <div class="w-full bg-white">
      <BaseSelectInput
        id="jobLocation"
        v-model="portal.filter.location"
        label="Location"
        placeholder="Location"
      >
        <option value="" disabled selected hidden></option>

        <option value="All Location" selected>All Locations</option>
        <option
          v-for="companyAssignment in landingPage.companyAssignments"
          :key="companyAssignment.id"
          :value="companyAssignment.title"
        >
          {{ companyAssignment.title }}
        </option>
      </BaseSelectInput>
    </div>

    <BaseAdvancedButton @click="toggleAdvancedFilters" id="advancedBtn"
      >Advanced</BaseAdvancedButton
    >
  </div>

  <Transition
    enter-from-class="opacity-0"
    enter-active-class="transition-opacity opacity-0 ease-in-out duration-300"
    leave-active-class="transition-opacity opacity-0 ease-in-out duration-300"
    leave-to-class="opacity-0"
  >
    <div
      v-if="showAdvancedFilters"
      class="flex mx-auto pb-8 max-w-6xl justify-center items-center space-x-8"
    >
      <div class="w-full bg-white">
        <BaseSelectInput
          id="jobType"
          v-model="portal.filter.job_type"
          label="Job Type"
          :canSearch="false"
        >
          <option value="" disabled selected hidden></option>

          <option value="All Job Types" selected>All Job Types</option>
          <option
            v-for="jobType in landingPage.jobTypes"
            :key="jobType.title"
            :value="jobType.title"
          >
            {{ jobType.title }}
          </option>
        </BaseSelectInput>
      </div>

      <div class="w-full bg-white">
        <BaseSelectInput
          id="employmentType"
          v-model="portal.filter.employment_type"
          label="Employment Type"
          :canSearch="false"
        >
          <option value="" disabled selected hidden></option>

          <option value="All Employment Types" selected>
            All Employment Types
          </option>
          <option
            v-for="employeeType in landingPage.employmentTypes"
            :key="employeeType.title"
            :value="employeeType.title"
          >
            {{ employeeType.title }}
          </option>
        </BaseSelectInput>
      </div>

      <div class="w-full bg-white">
        <BaseSelectInput
          id="industry"
          v-model="portal.filter.industry"
          label="Industry"
          placeholder="Industry"
        >
          <option value="" disabled selected hidden></option>

          <option value="All Industries" selected>All Industries</option>
          <option
            v-for="industry in landingPage.industries"
            :key="industry.id"
            :value="industry.title"
          >
            {{ industry.title }}
          </option>
        </BaseSelectInput>
      </div>
    </div>
  </Transition>

  <div
    v-if="
      portal.filter.search ||
      (portal.filter.location && !portal.filter.location.includes('All')) ||
      (portal.filter.job_type && !portal.filter.job_type.includes('All')) ||
      (portal.filter.employment_type &&
        !portal.filter.employment_type.includes('All')) ||
      (portal.filter.industry &&
        !portal.filter.industry.includes('All') &&
        !portal.isLoading)
    "
    class="flex mx-auto max-w-6xl justify-center items-center space-x-8"
  >
    <div class="w-full border-gray-300 space-y-1">
      <h1 class="text-gray-800 font-semibold">Your search query:</h1>

      <div class="flex items-center space-x-2 text-xs">
        <div
          v-if="portal.filter.search && !portal.filter.search.includes('All')"
          class="bg-white w-max p-2 border-gray-200 border-2 rounded-sm"
        >
          <h1 class="px-0.5">
            Search:
            <span class="text-blue-400 px-0.5">{{ portal.filter.search }}</span>
          </h1>
        </div>

        <div
          v-if="
            portal.filter.location && !portal.filter.location.includes('All')
          "
          class="bg-white w-max p-2 border-gray-200 border-2 rounded-sm"
        >
          <h1 class="px-0.5">
            Location:
            <span class="text-blue-400 px-0.5">{{
              portal.filter.location
            }}</span>
          </h1>
        </div>

        <div
          v-if="
            portal.filter.job_type && !portal.filter.job_type.includes('All')
          "
          class="bg-white w-max p-2 border-gray-200 border-2 rounded-sm"
        >
          <h1 class="px-0.5">
            Job Type:
            <span class="text-blue-400 px-0.5">{{
              portal.filter.job_type
            }}</span>
          </h1>
        </div>

        <div
          v-if="
            portal.filter.employment_type &&
            !portal.filter.employment_type.includes('All')
          "
          class="bg-white w-max p-2 border-gray-200 border-2 rounded-sm"
        >
          <h1 class="px-0.5">
            Employment Type:
            <span class="text-blue-400 px-0.5">{{
              portal.filter.employment_type
            }}</span>
          </h1>
        </div>

        <div
          v-if="
            portal.filter.industry && !portal.filter.industry.includes('All')
          "
          class="bg-white w-max p-2 border-gray-200 border-2 rounded-sm"
        >
          <h1 class="px-0.5">
            Industry:
            <span class="text-blue-400 px-0.5">{{
              portal.filter.industry
            }}</span>
          </h1>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="portal.isLoading"
    class="flex flex-col py-8 mx-auto max-w-6xl justify-center items-center space-y-0.5"
  >
    <div class="text-white py-2 px-2 w-full">
      <div class="flex flex-wrap -mx-3">
        <div class="w-full px-3 text-center">
          <div class="p-5 xl:px-0 md:py-5 space-y-2">
            <BaseLoadingDetails />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-else
    class="flex flex-col py-8 mx-auto max-w-6xl justify-center items-center space-y-0.5"
  >

    <template v-if="applications.allJobApplications.length > 0">
    <div class="bg-white shadow-xl text-white py-2 px-2 w-full mb-4">
        <div class="flex flex-wrap -mx-3">
          <div class="w-full px-3">
            <div class="p-5 xl:px-0 md:py-5 space-y-2 flex justify-between items-center">
              <div class="flex items-center">
              <h1 class="text-md text-gray-800 pl-3 font-bold">Your current application status: </h1>
              <h1 class="text-sm text-gray-800">
                <div class="w-full">
                <p
                  v-if="applications.allJobApplications
          .slice()
          .reverse()[0].status === 0"
                  class="mx-4 px-4 py-2 bg-red-500 w-max rounded-full text-white"
                >
                  Disqualified
                </p>
                <p
                  v-if="applications.allJobApplications
          .slice()
          .reverse()[0].status === 1"
                  class="mx-4 px-4 py-2 bg-gray-500 w-max rounded-full text-white"
                >
                Pending
                </p>
                <p
                  v-if="applications.allJobApplications
          .slice()
          .reverse()[0].status === 2"
                  class="mx-4 px-4 py-2 bg-yellow-500 w-max rounded-full text-white"
                >
                For Interview
                </p>
                <p
                  v-if="applications.allJobApplications
          .slice()
          .reverse()[0].status === 3"
                  class="mx-4 px-4 py-2 bg-orange-500 w-max rounded-full text-white"
                >
                In Progress
                </p>
                <p
                  v-if="applications.allJobApplications
          .slice()
          .reverse()[0].status === 4"
                  class="mx-4 px-4 py-2 bg-blue-500 w-max rounded-full text-white"
                >
                  Qualified
                </p>
                <p
                  v-if="applications.allJobApplications
          .slice()
          .reverse()[0].status === 5"
                  class="mx-4 px-4 py-2 bg-green-500 w-max rounded-full text-white"
                >
                  Hired
                </p>
              </div>
              </h1>
            </div>

            <div class="flex items-center px-3">
              <h1 class="text-md text-gray-800 pl-3 font-bold">Job Position: </h1>
              <h1 class="text-sm text-gray-800 pl-3">{{ applications.allJobApplications
          .slice()
          .reverse()[0].job_position.title }}</h1>
            </div>

            <div class="flex items-center px-3">
              <h1 class="text-md text-gray-800 pl-3 font-bold">Location: </h1>
              <h1 class="text-sm text-gray-800 pl-3">{{ applications.allJobApplications
          .slice()
          .reverse()[0].job_position.location }}</h1>
            </div>
            </div>
          </div>
        </div>
      </div>
  </template>
    
    <template v-if="portal.allJobPositions.length === 0">
      <div class="bg-white shadow-xl text-white py-2 px-2 w-full">
        <div class="flex flex-wrap -mx-3">
          <div class="w-full px-3 text-center">
            <div class="p-5 xl:px-0 md:py-5 space-y-2">
              <h1 class="text-xl text-gray-800">No Job found 😰</h1>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div
        class="text-gray-600 border-b-2 font-semibold py-3 px-5 w-full bg-white border-gray-300"
      >
        <h1
          v-if="
            portal.filter.search ||
            (portal.filter.location &&
              !portal.filter.location.includes('All')) ||
            (portal.filter.job_type &&
              !portal.filter.job_type.includes('All')) ||
            (portal.filter.employment_type &&
              !portal.filter.employment_type.includes('All')) ||
            (portal.filter.industry && !portal.filter.industry.includes('All'))
          "
        >
          Your search has found
          <span class="bg-blue-400 px-3 py-1 rounded-md text-white">{{
            portal.allJobPositions.length
          }}</span>

          <span class="px-1" v-if="portal.allJobPositions.length === 1"
            >job.</span
          >
          <span class="px-1" v-else>jobs.</span>
        </h1>
        <h1 v-else>
          There's a total of
          <span class="bg-blue-400 px-3 py-1 rounded-md text-white">{{
            portal.allJobPositions.length
          }}</span>
          jobs.
        </h1>
      </div>
      <template
        v-for="jobPosition in portal.allJobPositions.slice().reverse()"
        :key="jobPosition.id"
      >
        <BaseCardJob :details="jobPosition" />
      </template>
    </template>
  </div>
</template>
