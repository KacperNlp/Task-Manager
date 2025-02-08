<template lang="">
  <ul v-if="tasks.length" class="flex flex-col gap-2">
    <AppTaskCard
      v-for="task in tasks"
      @key="task._id"
      :task="task"
      @updateTasks="emit('updateTasks')"
      @updateTaskStatus="updateTaskStatus"
      @click="openTask(task._id)"
    />
  </ul>

  <UModal v-model="isTaskModalActive" class="max-w-[800px]">
    <AppTaskModal :task-id="clickedTaskId" />
  </UModal>
</template>

<script lang="ts" setup>
import type { Task } from "~/types/types";

const isTaskModalActive = ref(false);
const clickedTaskId = ref<string | null>(null);

interface Props {
  tasks: Task[] | undefined;
}

defineProps<Props>();
const emit = defineEmits(["updateTasks", "updateTaskStatus"]);

function updateTaskStatus(task: Task) {
  emit("updateTasks", task);
}

function openTask(id: string) {
  isTaskModalActive.value = true;
  clickedTaskId.value = id;
}
</script>
