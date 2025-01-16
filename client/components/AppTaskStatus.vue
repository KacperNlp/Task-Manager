<template>
  <span class="font-semibold text-sm" :class="taskStatusClasses">{{
    taskStatusLabel
  }}</span>
</template>

<script setup lang="ts">
import type { TaskStatus } from "../types/types";

interface Props {
  taskStatus: TaskStatus;
}

const props = defineProps<Props>();

const taskStatusLabel = computed(() => {
  switch (props.taskStatus) {
    case "NotStarted":
      return "Not started";
    case "InProgress":
      return "In progress";
    case "Done":
      return "Done";
    default:
      return "Not started";
  }
});

const taskStatusClasses = computed(() => {
  switch (props.taskStatus) {
    case "NotStarted":
      return "text-blue-500 bg-blue-100 px-2 py-1 rounded";
    case "InProgress":
      return "text-orange-500 bg-orange-100 px-2 py-1 rounded";
    case "Done":
      return "text-green-500 bg-green-100 px-2 py-1 rounded";
    default:
      return "text-gray-500 bg-gray-100 px-2 py-1 rounded";
  }
});
</script>
