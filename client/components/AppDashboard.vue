<template>
  <section>
    <AppTasksList :tasks="tasks" @updateTasks="getUserTasks" />
    <hr />
    <p>Stare zadania</p>
    <AppTasksList :tasks="oldTasks" @updateTasks="getUserTasks" />
  </section>
  <div class="mt-4">
    <AppButton
      v-show="!formIsActive"
      @click="changeAddTaskFormVisivility"
      class="text-sm"
    >
      + Dodaj nowe zadanie
    </AppButton>
    <AppCard v-show="formIsActive">
      <AppAddTaskForm
        @closeForm="changeAddTaskFormVisivility"
        @updateTasks="updateTasks"
      />
    </AppCard>
  </div>
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

await getUserTasks();
</script>
