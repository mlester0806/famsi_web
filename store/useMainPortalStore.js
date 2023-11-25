import { defineStore } from 'pinia';
import nuxtStorage from 'nuxt-storage';

export const useMainPortalStore = defineStore('filter', () => {
  const route = useRoute();
  const router = useRouter();

  const oldFilter = reactive({
    search: undefined,
    location: undefined,
    job_type: undefined,
    employment_type: undefined,
    industry: undefined,
  });

  const filter = reactive({
    search: route.query?.search,
    location: route.query?.location,
    job_type: route.query?.jobType,
    employment_type: route.query?.employmentType,
    industry: route.query?.industry,
  });
  const allJobPositions = ref(null);
  const jobPositionDetails = ref(null);
  const relatedJobsDetails = ref(null);
  const isLoading = ref(false);

  watch(filter, (value) => {
    isLoading.value = true;

    if (!value.location?.includes('All')) {
      oldFilter.location = value.location;
    } else {
      if (!Boolean(oldFilter.location) && value.location?.includes('All')) {
        oldFilter.location = value.location;
        isLoading.value = false;
        return; // No need to continue if route didn't change
      }
    }

    if (!value.job_type?.includes('All')) {
      oldFilter.job_type = value.job_type;
    } else {
      if (!Boolean(oldFilter.job_type) && value.job_type?.includes('All')) {
        oldFilter.job_type = value.job_type;
        isLoading.value = false;
        return; // No need to continue if route didn't change
      }
    }

    if (!value.employment_type?.includes('All')) {
      oldFilter.employment_type = value.employment_type;
    } else {
      if (
        !Boolean(oldFilter.employment_type) &&
        value.employment_type?.includes('All')
      ) {
        oldFilter.employment_type = value.employment_type;
        isLoading.value = false;
        return; // No need to continue if route didn't change
      }
    }

    if (!value.industry?.includes('All')) {
      oldFilter.industry = value.industry;
    } else {
      if (!Boolean(oldFilter.industry) && value.industry?.includes('All')) {
        oldFilter.industry = value.industry;
        isLoading.value = false;
        return; // No need to continue if route didn't change
      }
    }

    // Helper function to generate the query object
    const generateQuery = (value) => {
      const query = {};

      if (value.search) query.search = value.search;
      if (value.location && !value.location.includes('All'))
        query.location = value.location;
      if (value.job_type && !value.job_type.includes('All'))
        query.jobType = value.job_type;
      if (value.employment_type && !value.employment_type.includes('All'))
        query.employmentType = value.employment_type;
      if (value.industry && !value.industry.includes('All'))
        query.industry = value.industry;

      return query;
    };

    const query = generateQuery(value);

    router.push({ query });
  });

  const getAllJobPositions = async () => {
    const token = nuxtStorage.localStorage.getData('Token');
    if (!token) return;

    try {
      const { data } = await useFetch(
        'https://famsi-dashboard.tech/api/job-positions/details'
      );

      const filteredData = data.value.filter((el) => {
        const title = el.title.toLowerCase();
        const description = el.description.toLowerCase();
        const location = el.location;
        const jobType = el.job_type.title.replaceAll('+', ' ');
        const employmentType = el.employee_type.title.replaceAll('+', ' ');
        const industry = el.industry.title;

        return (
          (!filter.search ||
            title.includes(filter.search.toLowerCase()) ||
            description.includes(filter.search.toLowerCase())) &&
          (!filter.location ||
            location === filter.location ||
            filter.location.includes('All')) &&
          (!filter.job_type ||
            jobType === filter.job_type ||
            filter.job_type.includes('All')) &&
          (!filter.employment_type ||
            employmentType === filter.employment_type ||
            filter.employment_type.includes('All')) &&
          (!filter.industry ||
            industry === filter.industry ||
            filter.industry.includes('All'))
        );
      });

      allJobPositions.value = filteredData;
      isLoading.value = false;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getJobPositionDetails = async (id, slug) => {
    const token = nuxtStorage.localStorage.getData('Token');

    if (token) {
      try {
        const { data: jobPositionData } = await useFetch(
          `https://famsi-dashboard.tech/api/job-positions/details/${id}/${slug}`
        );

        const { data: relatedJobsData } = await useFetch(
          `https://famsi-dashboard.tech/api/job-positions/related-jobs/${id}`
        );

        if (jobPositionData.value) {
          jobPositionDetails.value = jobPositionData.value;
        } else {
          jobPositionDetails.value = false;
        }
        console.log(relatedJobsData.value);

        if (relatedJobsData.value) {
          relatedJobsDetails.value = relatedJobsData.value;
        } else {
          relatedJobsDetails.value = false;
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  return {
    filter,
    allJobPositions,
    jobPositionDetails,
    relatedJobsDetails,
    isLoading,
    getAllJobPositions,
    getJobPositionDetails,
  };
});
