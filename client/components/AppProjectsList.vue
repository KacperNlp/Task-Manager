<template>
  <section class="my-8">
    <ul
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <li v-for="project in store.projects">
        <AppCard
          class="flex flex-col gap-2 items-center hover:shadow-lg duration-200 cursor-pointer"
        >
          <h2 class="text-2xl font-semibold">{{ project.name }}</h2>
          <p>{{ project.description }}</p>
        </AppCard>
      </li>
    </ul>
  </section>
</template>
<script lang="ts" setup>
const store = useWebsiteStore();

async function fetchProjects() {
  try {
    await store.fetchProjectsList();
  } catch (err) {
    console.error(err);
  }
}

await fetchProjects();
</script>
