<template>
  <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
    <AppMainTitle v-if="store.isProjectsLoaded">
      {{ store.currentProject?.name }}
    </AppMainTitle>
    <div v-else>
      <AppTextPlaceholder size="xl" />
    </div>
    <div class="flex gap-4">
      <UButton
        icon="bi:pen"
        size="xs"
        color="primary"
        square
        variant="solid"
        aria-label="Edit project"
        @click="editProject"
      />
      <UButton
        icon="material-symbols:share-outline"
        size="xs"
        color="primary"
        square
        variant="solid"
        aria-label="Share project"
        @click="shareProject"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useProjectsStore();

function editProject() {
  console.log("Edit project!!");
}

function shareProject() {
  console.log("Share project!!");
}
</script>
