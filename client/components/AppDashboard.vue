<template>
  <main class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <section>
      <AppColumnHeadline>Przeterminowane</AppColumnHeadline>
      <AppTasksList
        :tasks="oldTasks"
        @updateTasks="getUserTasks"
        @updateTaskStatus="updateTaskStatus"
      />
    </section>
    <section>
      <AppColumnHeadline>Zadania na dziś</AppColumnHeadline>
      <AppTasksList
        :tasks="tasks"
        @updateTasks="getUserTasks"
        @updateTaskStatus="updateTaskStatus"
      />
      <div class="mt-4">
        <AppButton v-show="!formIsActive" @click="changeAddTaskFormVisivility">
          + Dodaj nowe zadanie
        </AppButton>
        <AppCard v-show="formIsActive">
          <AppAddTaskForm
            @closeForm="changeAddTaskFormVisivility"
            @updateTasks="updateTasks"
          />
        </AppCard>
      </div>
    </section>
    <section>
      <AppColumnHeadline>Realizowane</AppColumnHeadline>
      <AppTasksList
        :tasks="tasks"
        @updateTasks="getUserTasks"
        @updateTaskStatus="updateTaskStatus"
      />
    </section>
    <section>
      <AppColumnHeadline>Zakończone</AppColumnHeadline>
      <AppTasksList
        :tasks="oldTasks"
        @updateTasks="getUserTasks"
        @updateTaskStatus="updateTaskStatus"
      />
    </section>
  </main>
</template>
<script setup lang="ts">
import type { Task } from "../types/types";

const tasks = ref<Task[]>([]);
const oldTasks = ref<Task[]>([]);
const formIsActive = ref(false);

async function getUserTasks() {
  try {
    const response = await $fetch("http://localhost:8080/tasks", {
      method: "GET",
      credentials: "include",
    });

    tasks.value = response.todayTasks;
    oldTasks.value = response.oldTasks;
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
