import { install } from "@imzdev/vue3-recaptcha-v2";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(install, {
    sitekey: "6LdGpScpAAAAADHOAhO1BbAei0Cw7_MikHb-YkK4",
    cnDomains: false,
  });
});