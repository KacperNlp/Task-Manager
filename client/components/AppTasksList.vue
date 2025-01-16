<template lang="">
  <ul v-if="tasks.length" class="flex flex-col gap-2">
    <AppTaskCard
      v-for="task in tasks"
      @key="task._id"
      :task="task"
      @updateTasks="emit('updateTasks')"
      @updateTaskStatus="updateTaskStatus"
    />
  </ul>
</template>

<script lang="ts" setup>
import type { Task } from "~/types/types";

interface Props {
  tasks: Task[] | undefined;
}

defineProps<Props>();
const emit = defineEmits(["updateTasks", "updateTaskStatus"]);

function updateTaskStatus(task: Task) {
  emit("updateTasks", task);
}
</script>
