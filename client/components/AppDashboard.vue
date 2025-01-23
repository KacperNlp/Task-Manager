<template>
  <AppProjectsList v-show="isProjectsListVisible" />
  <main
    v-show="!isProjectsListVisible"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
  >
    <section>
      <AppColumnHeadline>Przeterminowane</AppColumnHeadline>
      <AppTasksList
        :tasks="notStartedTasksOld"
        @updateTasks="getUserTasks"
        @updateTaskStatus="updateTaskStatus"
      />
    </section>
    <section>
      <AppColumnHeadline>Zadania na dziś</AppColumnHeadline>
      <AppTasksList
        :tasks="notStartedTasksToday"
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
        :tasks="inProgressTasks"
        @updateTasks="getUserTasks"
        @updateTaskStatus="updateTaskStatus"
      />
    </section>
    <section>
      <AppColumnHeadline>Zakończone</AppColumnHeadline>
      <AppTasksList
        :tasks="doneTasks"
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

const tasks = ref<Task[]>([]);
const oldTasks = ref<Task[]>([]);
const formIsActive = ref(false);
const isProjectsListVisible = ref(true);

const doneTasks = computed(() => {
  const todayTasksDone = tasks.value.filter((task) => task.status === "Done");
  const oldTasksDone = oldTasks.value.filter((task) => task.status === "Done");

  return [...todayTasksDone, ...oldTasksDone];
});

const inProgressTasks = computed(() => {
  const todayTasksInProgress = tasks.value.filter(
    (task) => task.status === "InProgress"
  );
  const oldTasksInPorgress = oldTasks.value.filter(
    (task) => task.status === "InProgress"
  );

  return [...todayTasksInProgress, ...oldTasksInPorgress];
});

const notStartedTasksToday = computed(() =>
  tasks.value.filter((task) => task.status === "NotStarted")
);

const notStartedTasksOld = computed(() =>
  oldTasks.value.filter((task) => task.status === "NotStarted")
);

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
