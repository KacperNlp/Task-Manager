<template>
  <ul
    v-if="tasks?.length && tasksStore.isTasksLoaded"
    class="flex flex-col gap-2"
  >
    <li v-for="task in tasks" :key="task._id">
      <AppTaskCard
        :task="task"
        @updateTasks="emit('updateTasks')"
        @updateTaskStatus="updateTaskStatus"
        @click="openTask(task._id)"
      />
    </li>
  </ul>

  <ul v-else-if="!tasksStore.isTasksLoaded" class="flex flex-col gap-2">
    <ol v-for="n in 3" :key="n">
      <AppHugePlaceholder />
    </ol>
  </ul>

  <UModal v-model="isTaskModalActive" fullscreen>
    <AppTaskModal :task-id="clickedTaskId" @closeMoadal="handleCloseModal" />
  </UModal>
</template>

<script lang="ts" setup>
import type { Task } from "~/types/types";

const tasksStore = useTasksStore();

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

function handleCloseModal() {
  isTaskModalActive.value = false;
  clickedTaskId.value = null;
}
</script>
