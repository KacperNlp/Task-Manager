<template>
  <AppProjectsList v-show="isProjectsListVisible" />
  <main
    v-show="!isProjectsListVisible"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
  >
    <section>
      <AppColumnHeadline>Przeterminowane</AppColumnHeadline>
      <AppTasksList
        :tasks="store.getNotStartedOldTasks"
        @updateTasks="getUserTasks"
        @updateTaskStatus="updateTaskStatus"
      />
    </section>
    <section>
      <AppColumnHeadline>Zadania na dziś</AppColumnHeadline>
      <AppTasksList
        :tasks="store.getNotStartedTasks"
        @updateTasks="getUserTasks"
        @updateTaskStatus="updateTaskStatus"
      />
      <div class="mt-4">
        <AppButton v-show="!formIsActive" @click="changeAddTaskFormVisivility">
          + Dodaj nowe zadanie
        </AppButton>
      </div>
    </section>
    <section>
      <AppColumnHeadline>Realizowane</AppColumnHeadline>
      <AppTasksList
        :tasks="store.getTasksInProgress"
        @updateTasks="getUserTasks"
        @updateTaskStatus="updateTaskStatus"
      />
    </section>
    <section>
      <AppColumnHeadline>Zakończone</AppColumnHeadline>
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
  </main>
</template>
<script setup lang="ts">
import type { Task } from "../types/types";

const store = useWebsiteStore();

const formIsActive = ref(false);
const isProjectsListVisible = ref(false);

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

await getUserTasks();
</script>
