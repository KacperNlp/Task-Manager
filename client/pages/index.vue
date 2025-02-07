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

async function fetchAllRequiredData() {
  try {
    await Promise.all([
      store.fetchTasks(),
      store.fetchLoggedUserData(),
      store.fetchProjectsList(),
    ]);
  } catch (error) {
    console.error(error);
  }
}

await fetchAllRequiredData();
</script>
