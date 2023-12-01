<script setup>
const props = defineProps({
  details: Object,
  status: Number,
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
</script>

<template>
  <div class="bg-white text-white shadow-xl w-full">
    <div class="flex flex-wrap -mx-3 py-5 px-5">
      <div class="w-full sm:w-1/2 md:w-2/3 px-3 text-left flex-grow-1">
        <div class="p-5 xl:px-0 md:py-5 space-y-2">
          <a
            :href="readMore"
            class="w-max text-2xl font-semibold text-blue-500 hover:text-blue-600 hover:text-underline"
          >
            {{ details.title }}
          </a>

          <p class="text-sm text-black leading-relaxed">
            {{ details.description }}
          </p>
        </div>
      </div>
      <div class="w-full sm:w-1/2 md:w-1/3 text-center">
        <div
          class="p-5 xl:px-4 md:py-5 bg-gray-100 text-gray-700 flex flex-wrap items-center"
        >
          <div class="w-full text-left text-md">
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
                <p class="py-2">Job Type:</p>
              </div>

              <div class="w-full">
                <p class="px-4 py-2">{{ details.job_type.title }}</p>
              </div>
            </div>

            <div class="flex items-center border-t-2 border-gray-200">
              <div class="md:w-1/2 font-semibold">
                <p class="py-2">Employment Type:</p>
              </div>

              <div class="w-full">
                <p class="px-4 py-2">{{ details.employee_type.title }}</p>
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

            <div class="flex items-center border-t-2 border-gray-200">
              <div class="md:w-1/2 font-semibold">
                <p class="py-2">Application Status:</p>
              </div>

              <div class="w-full">
                <p
                  v-if="status === 0"
                  class="mx-4 px-4 py-2 bg-red-500 w-max rounded-full text-white"
                >
                  Disqualified
                </p>
                <p
                  v-if="status === 1"
                  class="mx-4 px-4 py-2 bg-gray-500 w-max rounded-full text-white"
                >
                Pending
                </p>
                <p
                  v-if="status === 2"
                  class="mx-4 px-4 py-2 bg-yellow-500 w-max rounded-full text-white"
                >
                For Interview
                </p>
                <p
                  v-if="status === 3"
                  class="mx-4 px-4 py-2 bg-orange-500 w-max rounded-full text-white"
                >
                In Progress
                </p>
                <p
                  v-if="status === 4"
                  class="mx-4 px-4 py-2 bg-blue-500 w-max rounded-full text-white"
                >
                  Qualified
                </p>
                <p
                  v-if="status === 5"
                  class="mx-4 px-4 py-2 bg-green-500 w-max rounded-full text-white"
                >
                  Hired
                </p>
              </div>
            </div>

            <a :href="readMore">
              <button
                class="bg-blue-400 hover:bg-blue-500 transition duration-150 text-white px-4 py-3 w-full mt-2"
              >
                Read More
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
