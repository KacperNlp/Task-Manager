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
    Promise.all([await store.fetchTasks(), await store.fetchLoggedUserData()]);
  } catch (error) {
    console.error(error);
  }
}

await fetchAllRequiredData();
</script>
