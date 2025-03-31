<template>
  <div class="flex items-center justify-between gap-4 md:table-row" role="row">
    <h2 class="text-lg font-semibold md:table-cell" role="cell">
      {{ task.title }}
    </h2>
    <p class="text-sm text-gray-400 md:table-cell" role="cell">
      {{ task.description }}
    </p>
    <time class="text-sm text-gray-400 md:table-cell" role="cell">{{
      formatDate(task.date)
    }}</time>
    <AppTaskStatus :task-status="task.taskType" role="cell" />
  </div>
</template>

<script setup lang="ts">
import type { Task } from "~/types/types";

const props = defineProps<{
  task: Task;
}>();

const { formatDate } = useDateFormater();
</script>
