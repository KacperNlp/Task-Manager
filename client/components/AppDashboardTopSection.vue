<template>
  <div class="flex items-center gap-8">
    <h1 class="text-5xl font-bold">
      {{ store.getuCurrentProject?.name }}
    </h1>
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
const store = useWebsiteStore();

function editProject() {
  console.log("Edit project!!");
}

function shareProject() {
  console.log("Share project!!");
}
</script>
