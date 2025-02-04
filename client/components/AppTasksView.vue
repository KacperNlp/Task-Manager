<template>
  <section class="grid grid-cols-3 gap-3">
    <section class="p-4 bg-gray-50 rounded-lg">
      <AppColumnHeadline
        :count="store.getNotStartedTasks.length"
        text="To do"
        columnType="toDo"
      />
      <AppTasksList
        :tasks="store.getNotStartedTasks"
        @updateTasks="getUserTasks"
        @updateTaskStatus="updateTaskStatus"
      />
    </section>
    <section class="p-4 bg-gray-50 rounded-lg">
      <AppColumnHeadline
        :count="store.getTasksInProgress.length"
        text="On Progress"
        columnType="progress"
      />
      <AppTasksList
        :tasks="store.getTasksInProgress"
        @updateTasks="getUserTasks"
        @updateTaskStatus="updateTaskStatus"
      />
    </section>
    <section class="p-4 bg-gray-50 rounded-lg">
      <AppColumnHeadline
        :count="store.getDoneTasks.length"
        text="Done"
        columnType="done"
      />
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
