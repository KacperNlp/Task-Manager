<template>
  <section class="grid grid-cols-1 lg:grid-cols-3 gap-3">
    <AppColumnSection>
      <AppColumnHeadline
        :count="tasksStore.notStartedTasks.length"
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
        :tasks="tasksStore.notStartedTasks"
        @updateTasks="getUserTasks"
        @updateTaskStatus="updateTaskStatus"
      />
    </AppColumnSection>
    <AppColumnSection>
      <AppColumnHeadline
        :count="tasksStore.inProgressTasks.length"
        text="On Progress"
        columnType="progress"
      />
      <AppTasksList
        :tasks="tasksStore.inProgressTasks"
        @updateTasks="getUserTasks"
        @updateTaskStatus="updateTaskStatus"
      />
    </AppColumnSection>
    <AppColumnSection>
      <AppColumnHeadline
        :count="tasksStore.doneTasks.length"
        text="Done"
        columnType="done"
      />
      <AppTasksList
        :tasks="tasksStore.doneTasks"
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

const tasksStore = useTasksStore();
const projectStore = useProjectsStore();

const formIsActive = ref(false);

async function getUserTasks() {
  try {
    const { currentProjectId } = projectStore;
    if (currentProjectId) await tasksStore.fetchTasks(currentProjectId);
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
