<template>
  <div class="flex items-center gap-8">
    <h1 class="text-gray-900 text-5xl font-bold">
      {{ store.getuCurrentProject?.name }}
    </h1>
    <div class="flex gap-4">
      <button
        @click="editProject"
        aria-label="Edit project"
        class="flex items-center bg-blue-200 p-2 border border-blue-200 hover:border-blue-700 duration-200 rounded-md"
      >
        <UIcon name="bi:pen" class="h-4 w-4 text-blue-700 ms-auto" />
      </button>
      <button
        @click="shareProject"
        aria-label="Share project"
        class="flex items-center bg-blue-200 p-2 border border-blue-200 hover:border-blue-700 duration-200 rounded-md"
      >
        <UIcon
          name="material-symbols:share-outline"
          class="h-4 w-4 text-blue-700 ms-auto"
        />
      </button>
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
