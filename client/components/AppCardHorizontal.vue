<template>
  <div
    class="flex flex-wrap items-center justify-between gap-4 md:table-row border-t md:border-t-0 border-gray-500 py-2 md:py-0 my-2 md:my-0"
    role="row"
  >
    <h2
      class="w-full md:w-auto text-lg font-semibold md:table-cell md:py-4 md:px-2 md:my-2 md:border-b md:border-gray-500"
      role="cell"
    >
      {{ task.title }}
    </h2>
    <p
      class="w-full md:w-auto text-sm text-gray-400 md:table-cell md:py-4 md:px-2 md:my-2 md:border-b md:border-gray-500"
      role="cell"
    >
      {{ task.description }}
    </p>
    <time
      class="text-sm text-gray-400 md:table-cell md:py-4 md:px-2 md:my-2 md:border-b md:border-gray-500"
      role="cell"
      >{{ formatDate(task.date) }}</time
    >
    <div
      class="md:table-cell md:py-4 md:px-2 md:my-2 md:border-b md:border-gray-500"
      role="cell"
    >
      <AppTaskStatus :task-status="task.taskType" />
    </div>
    <div
      class="md:table-cell md:py-4 md:px-2 md:my-2 md:border-b md:border-gray-500"
      role="cell"
    >
      <UButton @click="openTask">Pokaż</UButton>
    </div>
  </div>

  <UModal v-model="isTaskModalActive" class="task-modal">
    <AppTaskModal :task-id="clickedTaskId" @closeMoadal="handleCloseModal" />
  </UModal>
</template>

<script setup lang="ts">
import type { Task } from "~/types/types";

const props = defineProps<{
  task: Task;
}>();

const { formatDate } = useDateFormater();

const isTaskModalActive = ref(false);
const clickedTaskId = ref<string | null>(null);

function openTask() {
  isTaskModalActive.value = true;
  clickedTaskId.value = props.task._id;
}

function handleCloseModal() {
  isTaskModalActive.value = false;
  clickedTaskId.value = null;
}
</script>
