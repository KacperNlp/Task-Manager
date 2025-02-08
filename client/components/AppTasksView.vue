<template>
  <section class="grid grid-cols-3 gap-3">
    <AppColumnSection>
      <AppColumnHeadline
        :count="store.getNotStartedTasks.length"
        text="To do"
        columnType="toDo"
      >
        <UButton
          icon="cuida:plus-outline"
          size="xs"
          color="primary"
          square
          variant="solid"
          aria-label="Add new task"
          class="ml-auto"
          @click="changeAddTaskFormVisivility"
        />
      </AppColumnHeadline>
      <AppTasksList
        :tasks="store.getNotStartedTasks"
        @updateTasks="getUserTasks"
        @updateTaskStatus="updateTaskStatus"
      />
    </AppColumnSection>
    <AppColumnSection>
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
    </AppColumnSection>
    <AppColumnSection>
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
    </AppColumnSection>
    <UModal v-model="formIsActive">
      <AppAddTaskForm
        @closeForm="changeAddTaskFormVisivility"
        @updateTasks="updateTasks"
      />
    </UModal>
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
