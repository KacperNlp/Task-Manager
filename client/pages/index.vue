<template>
  <div>
    <AppHeader />
    <AppContainer>
      <AppDashboard />
    </AppContainer>
  </div>
</template>

<script lang="ts" setup>
const store = useWebsiteStore();
const route = useRoute();

async function fetchAllRequiredData() {
  try {
    await Promise.all([store.fetchProjectsList(), store.fetchLoggedUserData()]);

    const queryValue = route.query?.project;
    const projetId = Array.isArray(queryValue)
      ? queryValue[0]
      : queryValue || "";

    store.setProject(projetId);

    await store.fetchTasks();
  } catch (error) {
    console.error(error);
  }
}

await fetchAllRequiredData();
</script>
