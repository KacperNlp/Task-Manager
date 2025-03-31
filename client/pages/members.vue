<template>
  <AppMainTitle class="mb-8"
    >Członkowie projektu: {{ projectsStore.currentProject?.name }}</AppMainTitle
  >
  <ul class="flex flex-col gap-4">
    <li v-for="user in projectsStore.currentProject?.users" :key="user">
      {{ user }}
    </li>
  </ul>
</template>

<script setup lang="ts">
const projectsStore = useProjectsStore();
</script>
