<template>
  <section class="grid grid-cols-3 gap-3">
    <section class="p-4 bg-gray-100 rounded-lg">
      <AppColumnHeadline
        :count="store.getNotStartedTasks.length"
        text="To do"
        columnType="toDo"
      >
        <button
          @click="changeAddTaskFormVisivility"
          class="flex items-center bg-blue-200 p-1 border border-blue-200 hover:border-blue-700 duration-200 rounded-md ml-auto"
        >
          <Icon
            name="cuida:plus-outline"
            class="h-3 w-3 text-blue-700 ms-auto"
          />
        </button>
      </AppColumnHeadline>
      <AppTasksList
        :tasks="store.getNotStartedTasks"
        @updateTasks="getUserTasks"
        @updateTaskStatus="updateTaskStatus"
      />
    </section>
    <section class="p-4 bg-gray-100 rounded-lg">
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
    <section class="p-4 bg-gray-100 rounded-lg">
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
    <AppLayer v-show="formIsActive" @close-layer="changeAddTaskFormVisivility">
      <AppAddTaskForm
        @closeForm="changeAddTaskFormVisivility"
        @updateTasks="updateTasks"
      />
    </AppLayer>
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
  formIsActive.value = !formIsActive.value;
}

function updateTasks() {
  changeAddTaskFormVisivility();
  getUserTasks();
}

function updateTaskStatus(task: Task) {
  console.log("Hello there!");
}
</script>
