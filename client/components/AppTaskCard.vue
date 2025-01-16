<template>
  <li class="relative py-6 border-b">
    <div class="flex flex-col md:flex-row justify-between items-start gap-2">
      <h3 class="text-lg font-semibold">{{ task.title }}</h3>
      <AppTaskStatus :task-status="task.status" />
    </div>
    <p class="text-sm text-gray-600">{{ task.description }}</p>
    <strong>{{ task.date }}</strong>
    <div class="absolute bottom-2 right-0 flex justify-end gap-1">
      <AppButton v-if="!isTaskDone" @click="changeTaskStatus">{{
        btnLabel
      }}</AppButton>
      <AppButton @click="deleteTask" btnType="danger"> Usuń </AppButton>
    </div>
  </li>
</template>

<script lang="ts" setup>
import type { Task } from "~/types/types";

interface Props {
  task: Task;
}

const props = defineProps<Props>();

const emit = defineEmits(["updateTasks", "updateTaskStatus"]);

const isTaskDone = computed(() => props.task.status === "Done");
const btnLabel = computed(() =>
  props.task.status === "NotStarted" ? "Rozpocznij" : "Zakończ"
);

async function deleteTask() {
  try {
    await $fetch(`http://localhost:8080/tasks/${props.task._id}`, {
      method: "DELETE",
      credentials: "include",
    });

    emit("updateTasks");
  } catch (error) {
    console.error(error);
  }
}

async function changeTaskStatus() {
  try {
    const res = await $fetch<{ message: string; task: Task }>(
      `http://localhost:8080/tasks/status/${props.task._id}`,
      {
        method: "PUT",
        credentials: "include",
      }
    );

    emit("updateTaskStatus", res.task);
  } catch (error) {
    console.error(error);
  }
}
</script>
