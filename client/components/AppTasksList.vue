<template>
  <ul v-if="tasks.length" class="flex flex-col gap-2">
    <li v-for="task in tasks" @key="task._id" class="relative py-6 border-b">
      <h3 class="text-lg font-semibold">{{ task.title }}</h3>
      <p class="text-sm text-gray-600">{{ task.description }}</p>
      <div class="absolute bottom-2 right-0 flex justify-end">
        <AppButton
          @click="deleteTask(task._id)"
          class="text-sm"
          btnType="danger"
        >
          Usuń
        </AppButton>
      </div>
    </li>
  </ul>
  <p v-else class="text-center text-gray-600">Brak zadań</p>
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
const formIsActive = ref(false);

async function getUserTasks() {
  try {
    const response = await $fetch("http://localhost:8080/tasks", {
      method: "GET",
      credentials: "include",
    });

    tasks.value = response;
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

async function deleteTask(taskId: number | string) {
  try {
    await $fetch(`http://localhost:8080/tasks/${taskId}`, {
      method: "DELETE",
      credentials: "include",
    });

    getUserTasks();
  } catch (error) {
    console.error(error);
  }
}

await getUserTasks();
</script>
