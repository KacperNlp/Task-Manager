<template>
    <ul class="flex flex-col gap-2">
        <template v-if="!tasksStore.isTasksLoaded">
            <div v-for="n in 3" :key="n">
                <AppHugePlaceholder />
            </div>
        </template>

        <template v-else-if="tasks?.length">
            <li v-for="task in tasks" :key="task._id">
                <AppTaskCard
                    :task="task"
                    @updateTasks="emit('updateTasks')"
                    @updateTaskStatus="updateTaskStatus"
                    @openTask="openTask(task._id)"
                />
            </li>
        </template>
        <template v-else>
            <p class="text-center text-gray-400">No tasks found</p>
        </template>
    </ul>

    <UModal v-model="isTaskModalActive" class="task-modal">
        <AppTaskModal :task-id="clickedTaskId" @closeMoadal="handleCloseModal" />
    </UModal>
</template>

<script lang="ts" setup>
import type { Task } from '~/types/types';

const tasksStore = useTasksStore();

const isTaskModalActive = ref(false);
const clickedTaskId = ref<string | null>(null);

interface Props {
    tasks: Task[] | undefined;
}

defineProps<Props>();
const emit = defineEmits(['updateTasks', 'updateTaskStatus']);

function updateTaskStatus(task: Task) {
    emit('updateTasks', task);
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
