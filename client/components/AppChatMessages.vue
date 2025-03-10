<template>
  <div
    v-if="isYourMessage"
    class="self-end bg-primary-500 text-primary-50 p-2 rounded-md max-w-xs"
  >
    {{ message }}
  </div>
  <div v-else class="flex flex-col gap-2">
    <div class="flex flex-row gap-2">
      <span class="block w-4 h-4 bg-slate-300"></span>
      <span class="text-xs">{{ author }}</span>
    </div>
    <div
      class="self-start bg-primary-200 text-neutral-950 p-2 rounded-md max-w-xs"
    >
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message: string;
  author: string;
}

const props = defineProps<Props>();

const isYourMessage = computed(() => props.author === "You");
</script>
