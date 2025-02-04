<template>
  <section class="grid grid-cols-3 gap-3">
    <section class="p-4 bg-gray-50 rounded-lg">
      <AppColumnHeadline>
        To Do
        <span
          class="flex items-center justify-center w-4 h-4 bg-gray-200 text-gray-600 text-xs rounded-xl"
          >{{ store.getNotStartedTasks.length }}</span
        >
      </AppColumnHeadline>
      <AppTasksList
        :tasks="store.getNotStartedTasks"
        @updateTasks="getUserTasks"
        @updateTaskStatus="updateTaskStatus"
      />
    </section>
    <section class="p-4 bg-gray-50 rounded-lg">
      <AppColumnHeadline>
        On Progress
        <span
          class="flex items-center justify-center w-4 h-4 bg-gray-200 text-gray-600 text-xs rounded-xl"
          >{{ store.getTasksInProgress.length }}</span
        >
      </AppColumnHeadline>
      <AppTasksList
        :tasks="store.getTasksInProgress"
        @updateTasks="getUserTasks"
        @updateTaskStatus="updateTaskStatus"
      />
    </section>
    <section class="p-4 bg-gray-50 rounded-lg">
      <AppColumnHeadline>
        Done
        <span
          class="flex items-center justify-center w-4 h-4 bg-gray-200 text-gray-600 text-xs rounded-xl"
          >{{ store.getDoneTasks.length }}</span
        >
      </AppColumnHeadline>
      <AppTasksList
        :tasks="store.getDoneTasks"
        @updateTasks="getUserTasks"
        @updateTaskStatus="updateTaskStatus"
      />
    </section>
  </section>
</template>
<script setup lang="ts">
import type { Task } from "../types/types";

const store = useWebsiteStore();

const formIsActive = ref(false);

async function getUserTasks() {
  try {
    await store.fetchTasks();
  } catch (error) {
    console.error(error);
  }
}

function changeAddTaskFormVisivility() {
  //   formIsActive.value = !formIsActive.value;
}

function updateTasks() {
  changeAddTaskFormVisivility();
  getUserTasks();
}

function updateTaskStatus(task: Task) {
  console.log("Hello there!");
}

await getUserTasks();
</script>
