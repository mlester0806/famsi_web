<script setup>
import { useMainPortalStore } from '@/store/useMainPortalStore';
import { useLandingPageStore } from '@/store/useLandingPageStore';
import { useMyApplicationsStore } from '@/store/useMyApplicationsStore';
import { ref, watch, reactive } from 'vue';
import { useAuthStore } from '@/store/useAuthStore';

const auth = useAuthStore();

const portal = useMainPortalStore();
const landingPage = useLandingPageStore();
const applications = useMyApplicationsStore();

let additionalFiles;

if (applications?.allJobApplications.length !== 0) {
  additionalFiles = JSON.parse(applications.allJobApplications[applications.allJobApplications.length - 1].additional_files);
}

const alreadySubmitted = ref(Boolean(additionalFiles));

const form = reactive([
  {
    file_name: null,
    file_path: null,
  }
]);

let fileCount = 1;
let additionalFilesObj = {};

  if (applications.allJobApplications.length !== 0) {
Object.keys(additionalFiles).forEach((key) => {
  if (fileCount === 1) {
    form.length = 0;
  }

  if (key.includes('file_name')) {
    additionalFilesObj.file_name = additionalFiles[key]
  }

  if (key.includes('file_path')) {
    additionalFilesObj.file_path = null
  }

  if (fileCount % 2 === 0) {
    form.push(additionalFilesObj);

    additionalFilesObj = {};
  }

  fileCount++;
});
  }

const showAdvancedFilters = ref(false);


const enableEdit = () => {
  alreadySubmitted.value = false;
}

const toggleAdvancedFilters = () => {
  showAdvancedFilters.value = !showAdvancedFilters.value;
};


const applicationDetails = reactive({
  applicant_id: auth.user.applicant.applications[0].applicant_id,
  job_position_id: auth.user.applicant.applications[0].job_position_id,
});

const errors = reactive([
  {
    file_name: null,
    file_path: null,
  }
]);

const incrementCount = () => {
  if (form.length !== 15) {
    form.push({
      file_name: null,
      file_path: null,
    });
  }

  if (errors.length !== 15) {
    errors.push({
      file_name: null,
      file_path: null,
    });
  }
};

const decrementCount = (index) => {
  if (form.length > 1) {
    form.splice(index, 1);
  }

  if (errors.length > 1) {
    errors.splice(index, 1);
  }
};

const uploadRequirements = async () => {
  console.log(form);

  // Reset errors
  errors.forEach((error) => {
    Object.keys(error).forEach((key) => {
      error[key] = null;
    });
  });

  // Loop through form items and check for null
  form.forEach((item, index) => {
    Object.keys(item).forEach((key) => {
      if (item[key] === null) {
        errors[index][key] = `You need to upload ${key}.`;
      }
    });
  });

  // Check if there are any errors before proceeding with the upload
  const hasErrors = errors.some((error) => Object.values(error).some((value) => value !== null));

  if (!hasErrors) {
    await auth.uploadRequirements(form, applicationDetails);
  }
};

</script>

<template>
  <BaseImageCarousel id="imageCarousel" />

  <div class="flex py-8 mx-auto max-w-6xl justify-center items-center space-x-8">
    <BaseSearchBar id="searchJob" v-model="portal.filter.search" label="search" placeholder="Search for Job Title..." />

    <div class="w-full bg-white">
      <BaseSelectInput id="jobLocation" v-model="portal.filter.location" label="Location" placeholder="Location">
        <option value="" disabled selected hidden></option>

        <option value="All Location" selected>All Locations</option>
        <option v-for="companyAssignment in landingPage.companyAssignments" :key="companyAssignment.id"
          :value="companyAssignment.title">
          {{ companyAssignment.title }}
        </option>
      </BaseSelectInput>
    </div>

    <BaseAdvancedButton @click="toggleAdvancedFilters" id="advancedBtn">Advanced</BaseAdvancedButton>
  </div>

  <Transition enter-from-class="opacity-0" enter-active-class="transition-opacity opacity-0 ease-in-out duration-300"
    leave-active-class="transition-opacity opacity-0 ease-in-out duration-300" leave-to-class="opacity-0">
    <div v-if="showAdvancedFilters" class="flex mx-auto pb-8 max-w-6xl justify-center items-center space-x-8">
      <div class="w-full bg-white">
        <BaseSelectInput id="jobType" v-model="portal.filter.job_type" label="Job Type" :canSearch="false">
          <option value="" disabled selected hidden></option>

          <option value="All Job Types" selected>All Job Types</option>
          <option v-for="jobType in landingPage.jobTypes" :key="jobType.title" :value="jobType.title">
            {{ jobType.title }}
          </option>
        </BaseSelectInput>
      </div>

      <div class="w-full bg-white">
        <BaseSelectInput id="employmentType" v-model="portal.filter.employment_type" label="Employment Type"
          :canSearch="false">
          <option value="" disabled selected hidden></option>

          <option value="All Employment Types" selected>
            All Employment Types
          </option>
          <option v-for="employeeType in landingPage.employmentTypes" :key="employeeType.title"
            :value="employeeType.title">
            {{ employeeType.title }}
          </option>
        </BaseSelectInput>
      </div>

      <div class="w-full bg-white">
        <BaseSelectInput id="industry" v-model="portal.filter.industry" label="Industry" placeholder="Industry">
          <option value="" disabled selected hidden></option>

          <option value="All Industries" selected>All Industries</option>
          <option v-for="industry in landingPage.industries" :key="industry.id" :value="industry.title">
            {{ industry.title }}
          </option>
        </BaseSelectInput>
      </div>
    </div>
  </Transition>

  <div v-if="portal.filter.search ||
    (portal.filter.location && !portal.filter.location.includes('All')) ||
    (portal.filter.job_type && !portal.filter.job_type.includes('All')) ||
    (portal.filter.employment_type &&
      !portal.filter.employment_type.includes('All')) ||
    (portal.filter.industry &&
      !portal.filter.industry.includes('All') &&
      !portal.isLoading)
    " class="flex mx-auto max-w-6xl justify-center items-center space-x-8">
    <div class="w-full border-gray-300 space-y-1">
      <h1 class="text-gray-800 font-semibold">Your search query:</h1>

      <div class="flex items-center space-x-2 text-xs">
        <div v-if="portal.filter.search && !portal.filter.search.includes('All')"
          class="bg-white w-max p-2 border-gray-200 border-2 rounded-sm">
          <h1 class="px-0.5">
            Search:
            <span class="text-blue-400 px-0.5">{{ portal.filter.search }}</span>
          </h1>
        </div>

        <div v-if="portal.filter.location && !portal.filter.location.includes('All')
          " class="bg-white w-max p-2 border-gray-200 border-2 rounded-sm">
          <h1 class="px-0.5">
            Location:
            <span class="text-blue-400 px-0.5">{{
              portal.filter.location
            }}</span>
          </h1>
        </div>

        <div v-if="portal.filter.job_type && !portal.filter.job_type.includes('All')
            " class="bg-white w-max p-2 border-gray-200 border-2 rounded-sm">
          <h1 class="px-0.5">
            Job Type:
            <span class="text-blue-400 px-0.5">{{
              portal.filter.job_type
            }}</span>
          </h1>
        </div>

        <div v-if="portal.filter.employment_type &&
            !portal.filter.employment_type.includes('All')
            " class="bg-white w-max p-2 border-gray-200 border-2 rounded-sm">
          <h1 class="px-0.5">
            Employment Type:
            <span class="text-blue-400 px-0.5">{{
              portal.filter.employment_type
            }}</span>
          </h1>
        </div>

        <div v-if="portal.filter.industry && !portal.filter.industry.includes('All')
            " class="bg-white w-max p-2 border-gray-200 border-2 rounded-sm">
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

  <div v-if="portal.isLoading" class="flex flex-col py-8 mx-auto max-w-6xl justify-center items-center space-y-0.5">
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

  <div v-else class="flex flex-col py-8 mx-auto max-w-6xl justify-center items-center space-y-0.5">

    <template v-if="applications.allJobApplications.length > 0">
      <div class="bg-white shadow-xl text-white py-2 px-2 w-full mb-4">
        <div class="flex flex-wrap -mx-3">
          <div class="w-full px-3">
            <div class="p-5 xl:px-0 md:py-5 space-y-2 flex justify-between items-center">
              <div class="flex items-center">
                <h1 class="text-md text-gray-800 pl-3 font-bold">Your current application status: </h1>
                <h1 class="text-sm text-gray-800">
                  <div class="w-full">
                    <p v-if="applications.allJobApplications
                      .slice()
                      .reverse()[0].status === 0" class="mx-4 px-4 py-2 bg-red-500 w-max rounded-full text-white">
                      Disqualified
                    </p>
                    <p v-if="applications.allJobApplications
                      .slice()
                      .reverse()[0].status === 1" class="mx-4 px-4 py-2 bg-gray-500 w-max rounded-full text-white">
                      Pending
                    </p>
                    <p v-if="applications.allJobApplications
                      .slice()
                      .reverse()[0].status === 2" class="mx-4 px-4 py-2 bg-yellow-500 w-max rounded-full text-white">
                      For Interview
                    </p>
                    <p v-if="applications.allJobApplications
                      .slice()
                      .reverse()[0].status === 3" class="mx-4 px-4 py-2 bg-orange-500 w-max rounded-full text-white">
                      In Progress
                    </p>
                    <p v-if="applications.allJobApplications
                      .slice()
                      .reverse()[0].status === 4" class="mx-4 px-4 py-2 bg-blue-500 w-max rounded-full text-white">
                      Qualified
                    </p>
                    <p v-if="applications.allJobApplications
                      .slice()
                      .reverse()[0].status === 5" class="mx-4 px-4 py-2 bg-green-500 w-max rounded-full text-white">
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

            <div v-if="applications.allJobApplications
              .slice()
              .reverse()[0].status === 3" class="p-5 xl:px-0 md:py-2 space-y-2 flex justify-center items-center">
              <div class="flex items-center mb-2">
                <h1 class="text-md text-gray-800 pl-3 font-bold">Notes: </h1>
                <h1 class="text-sm text-gray-800">
                  <div class="w-full">
                    <p class="mx-3 w-max text-black">
                      {{ applications.allJobApplications
                        .slice()
                        .reverse()[0].notes }}
                    </p>
                  </div>
                </h1>
              </div>
            </div>

            <div v-if="applications.allJobApplications
              .slice()
              .reverse()[0].status === 3 && !alreadySubmitted"
              class="p-5 xl:px-0 md:pt-2 md:pb-0 flex justify-center items-center">
              <div class="flex items-center mb-2">
                <h1 class="text-md text-gray-800 pl-3 font-bold">You can upload up to 15
                  documents here:</h1>

              </div>
            </div>

            <div v-if="applications.allJobApplications
              .slice()
              .reverse()[0].status === 3 && alreadySubmitted"
              class="p-5 xl:px-0 md:pt-2 md:pb-0 flex justify-center items-center">
              <div class="flex items-center mb-2">
                <h1 v-if="alreadySubmitted" class="text-lg text-green-500 pl-3 font-bold">You've already submitted your
                  documents</h1>

              </div>
            </div>

            <div v-if="applications.allJobApplications
              .slice()
              .reverse()[0].status === 3 && alreadySubmitted"
              class="p-5 xl:px-0 md:pt-2 md:pb-0 flex justify-center items-center">
              <div class="flex items-center mb-2">
                <div>
                  <button @click="enableEdit"
                    class="px-4 py-1 bg-blue-500 text-white hover:bg-blue-600 duration-200 disabled:bg-blue-300 rounded-full">Edit</button>
                </div>

              </div>
            </div>


            <div v-if="applications.allJobApplications
              .slice()
              .reverse()[0].status === 3 && !alreadySubmitted">
              <div v-for="(file, index) in form" class="flex items-center space-x-4 justify-center">
                <div class="flex items-center space-x-6 text-gray-800">
                  <div>
                    <h1 class="text-md pl-3 font-bold w-max">File Name: </h1>
                  </div>
                  <div>
                    <BaseInputField :id="'file_name_' + index" v-model="form[index].file_name" type="text"
                      label="File Name *" placeholder="File Name" />
                    <p v-if="errors[index]?.file_name" class="text-red-500 text-sm -mt-3 absolute">{{
                      errors[index].file_name }}</p>
                  </div>
                </div>

                <div class="flex items-center space-x-6 px-2 text-gray-800">
                  <div>
                    <h1 class="text-md text-gray-800 pl-3 font-bold py-8 w-max">Upload File: </h1>
                  </div>
                  <div>
                    <BaseFileInput :id="'file_path_' + index" v-model="form[index].file_path" placeholder="Upload File" />
                    <p v-if="errors[index]?.file_path" class="text-red-500 text-sm -mt-8 absolute">{{
                      errors[index].file_path }}</p>
                  </div>
                </div>

                <div v-if="index" class="flex items-center space-x-6 px-2 mb-2">
                  <div>
                    <button @click="decrementCount(index)" :disabled="alreadySubmitted"
                      class="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 duration-200 disabled:bg-blue-300">
                      -</button>
                  </div>

                </div>

                <div v-else class="flex items-center space-x-6 px-2 mb-2">
                  <div>
                    <button class="px-4 py-2 bg-white text-white" disabled>
                    </button>
                  </div>

                </div>
              </div>
            </div>

            <div v-if="applications.allJobApplications
              .slice()
              .reverse()[0].status === 3 && !alreadySubmitted">
              <div class="flex items-center space-x-8 px-4 pb-4 justify-center">
                <div class="flex items-center space-x-6">
                  <div>
                    <button @click="incrementCount" :disabled="alreadySubmitted"
                      class="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 duration-200 disabled:bg-blue-300">Add New
                      File</button>
                  </div>

                </div>

                <div class="flex items-center space-x-6 px-2">
                  <div>
                    <button @click="uploadRequirements" :disabled="alreadySubmitted"
                      class="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 duration-200 disabled:bg-blue-300">Upload
                      All
                      Files</button>
                  </div>

                </div>
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
      <div class="text-gray-600 border-b-2 font-semibold py-3 px-5 w-full bg-white border-gray-300">
        <h1 v-if="portal.filter.search ||
          (portal.filter.location &&
            !portal.filter.location.includes('All')) ||
          (portal.filter.job_type &&
            !portal.filter.job_type.includes('All')) ||
          (portal.filter.employment_type &&
            !portal.filter.employment_type.includes('All')) ||
          (portal.filter.industry && !portal.filter.industry.includes('All'))
          ">
          Your search has found
          <span class="bg-blue-400 px-3 py-1 rounded-md text-white">{{
            portal.allJobPositions.length
          }}</span>

          <span class="px-1" v-if="portal.allJobPositions.length === 1">job.</span>
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
      <template v-for="jobPosition in portal.allJobPositions.slice().reverse()" :key="jobPosition.id">
        <BaseCardJob :details="jobPosition" />
      </template>
    </template>
  </div>
</template>
