<template>
  <div>
    <AppHeader />
    <AppContainer>
      <main class="pt-9 mx-auto xl:pl-8">
        <slot />
      </main>
    </AppContainer>
    <AppChat />
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
const usersStore = useUsersStore();
const projectsStore = useProjectsStore();

const { $websocket } = useNuxtApp();

const route = useRoute();

async function fetchAllRequiredData() {
  try {
    await Promise.all([
      projectsStore.fetchProjects(),
      usersStore.fetchLoggedUser(),
    ]);

    const queryValue = route.query?.project;
    let projetId = Array.isArray(queryValue) ? queryValue[0] : queryValue || "";

    projetId = projetId || projectsStore.projects[0]._id;

    if (projetId) {
      projectsStore.changeCurrentProject(projetId);
    }

    $websocket.connect(projetId);
  } catch (error) {
    console.error(error);
  }
}

await fetchAllRequiredData();
</script>
