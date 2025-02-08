<template>
  <span class="font-semibold text-sm" :class="taskStatusClasses">
    {{ taskStatusLabel }}
  </span>
</template>

<script setup lang="ts">
import type { TaskType } from "../types/types";

interface Props {
  taskStatus: TaskType;
}

const props = defineProps<Props>();

const taskStatusLabel = computed(() => {
  switch (props.taskStatus) {
    case "Low":
      return "Low";
    case "Medium":
      return "Medium";
    case "Hight":
      return "Hight";
    default:
      return "Low";
  }
});

const taskStatusClasses = computed(() => {
  switch (props.taskStatus) {
    case "Low":
      return "text-blue-500 bg-blue-100 px-2 py-1 rounded";
    case "Medium":
      return "text-orange-500 bg-orange-100 px-2 py-1 rounded";
    case "Hight":
      return "text-rose-500 bg-rose-100 px-2 py-1 rounded";
    default:
      return "text-gray-500 bg-gray-100 px-2 py-1 rounded";
  }
});
</script>
