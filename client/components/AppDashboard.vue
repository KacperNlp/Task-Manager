<template>
  <main class="pt-9">
    <section class="flex flex-col md:flex-row justify-between mb-9">
      <AppDashboardTopSection />
      <AppUsersList />
    </section>
    <AppTasksView />
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
