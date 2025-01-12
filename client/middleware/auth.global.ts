export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = await useFetch("/api/auth/token");

  if(!token.data.value && to.path !== '/login') {
      return navigateTo('/login')
  }
})