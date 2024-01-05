export function useApiFetch(path, options) {
  let headers = {};
  let hostedBackend = 'https://famsi-dashboard.tech';
  let localBackend = 'http://127.0.0.1:8000';

  const token = useCookie('XSRF-TOKEN');

  if (token.value) {
    headers['X-XSRF-TOKEN'] = token.value;
  }

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(['referer', 'cookie']),
    };
  }

  return useFetch(hostedBackend + path, {
    credentials: 'include',
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  });
}
