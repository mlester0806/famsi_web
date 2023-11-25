import { defineStore } from 'pinia';

export const useLandingPageStore = defineStore('landingPage', () => {
  const welcome = reactive({
    shortTitle: 'Apply Now!',
    title: 'A Service Provider Of',
    highlightedTitle: 'Highly Trained',
    remainingTitle: 'and Superior Workforce',
    description:
      'It is built to help Filipinos find decent job while giving our customer the benefits of Control, Compliance, Efficiency, and Cost Savings.',
  });

  const qualifications = ref(null);
  const benefits = ref(null);
  const companyAssignments = ref(null);
  const jobTypes = ref(null);
  const employmentTypes = ref(null);
  const industries = ref(null);
  const jobPositions = ref(null);

  const shortIntroduction = reactive({
    title: 'We at Fully Advanced Manpower Solutions, Inc.',
    description:
      'accepts all and temporary staffing requirements that may required by existing clients and prospective business associates. Were partners with countless major organisations around the globe',
  });

  const visitOffice = reactive({
    title: 'For those',
    highlightedTitle: 'interested applicants',
    remainingTitle: 'visit our office near you.',
    offices: [
      {
        id: 1,
        name: '📍2/F JEC Bldg. National Highway, Brgy. Banay-banay, Cabuyao City, Laguna.',
        landmark: 'Landmark: In front of Banay-banay Brgy Hall. near Super 8.',
      },
      {
        id: 2,
        name: '📍3rd floor Piazza de Juan Bldg. Crisanto M. Delos Reyes Ave. Brgy. Manggahan, General Trias Cavite',
        landmark: 'Landmark : At the top of Bon Appetea.',
      },
      {
        id: 3,
        name: '📍J&M Building, Brgy. Santiago, Malvar, Batangas.',
        landmark: 'Landmark : Near the Jollibee.',
      },
    ],
  });

  const currentOpenings = reactive({
    title: 'Here are all the current job positions.',
    positions: [
      {
        id: 1,
        title: 'HR Supervisor',
        description: 'Full-Time Job.',
      },
      {
        id: 2,
        title: 'Welder',
        description: 'Full-Time Job.',
      },
      {
        id: 3,
        title: 'Driver (Restrictions: 1,2,3)',
        description: 'Full-Time Job.',
      },
    ],
  });

  const fetchQualifications = async () => {
    try {
      const { data } = await useFetch(
        'https://famsi-dashboard.tech/api/qualifications'
      );

      if (data) {
        qualifications.value = data.value;
      }
    } catch (error) {
      console.error('Error fetching qualifications data:', error);
    }
  };

  const fetchBenefits = async () => {
    try {
      const { data } = await useFetch('https://famsi-dashboard.tech/api/benefits');

      if (data) {
        benefits.value = data.value;
      }
    } catch (error) {
      console.error('Error fetching benefits data:', error);
    }
  };

  const fetchCompanyAssignments = async () => {
    try {
      const { data } = await useFetch(
        'https://famsi-dashboard.tech/api/company-assignments'
      );

      if (data) {
        companyAssignments.value = data.value;
      }
    } catch (error) {
      console.error('Error fetching company assignments data:', error);
    }
  };

  const fetchJobTypes = async () => {
    try {
      const { data } = await useFetch('https://famsi-dashboard.tech/api/job-types');

      if (data) {
        jobTypes.value = data.value;
      }
    } catch (error) {
      console.error('Error fetching job types data:', error);
    }
  };

  const fetchEmploymentTypes = async () => {
    try {
      const { data } = await useFetch(
        'https://famsi-dashboard.tech/api/employment-types'
      );

      if (data) {
        employmentTypes.value = data.value;
      }
    } catch (error) {
      console.error('Error fetching employment types data:', error);
    }
  };

  const fetchIndustries = async () => {
    try {
      const { data } = await useFetch('https://famsi-dashboard.tech/api/industries');

      if (data) {
        industries.value = data.value;
      }
    } catch (error) {
      console.error('Error fetching industries data:', error);
    }
  };

  const fetchJobPositions = async () => {
    try {
      const { data } = await useFetch('https://famsi-dashboard.tech/api/job-positions/details');

      if (data) {
        jobPositions.value = data.value;
      }
    } catch (error) {
      console.error('Error fetching job positions data:', error);
    }
  };

  return {
    welcome,
    qualifications,
    benefits,
    companyAssignments,
    shortIntroduction,
    visitOffice,
    currentOpenings,
    jobTypes,
    employmentTypes,
    industries,
    jobPositions,
    fetchQualifications,
    fetchBenefits,
    fetchCompanyAssignments,
    fetchJobTypes,
    fetchEmploymentTypes,
    fetchIndustries,
    fetchJobPositions
  };
});
