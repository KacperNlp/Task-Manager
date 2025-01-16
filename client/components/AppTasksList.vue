<template lang="">
  <ul v-if="tasks.length" class="flex flex-col gap-2">
    <li v-for="task in tasks" @key="task._id" class="relative py-6 border-b">
      <h3 class="text-lg font-semibold">{{ task.title }}</h3>
      <p class="text-sm text-gray-600">{{ task.description }}</p>
      <strong>{{ task.date }}</strong>
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
</template>

<script lang="ts" setup>
import type { Task } from "~/types/types";

interface Props {
  tasks: Task | undefined;
}

defineProps<Props>();
const emit = defineEmits(["updateTasks"]);

async function deleteTask(taskId: number | string) {
  try {
    await $fetch(`http://localhost:8080/tasks/${taskId}`, {
      method: "DELETE",
      credentials: "include",
    });

    emit("updateTasks");
  } catch (error) {
    console.error(error);
  }
}
</script>
