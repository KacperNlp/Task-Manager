<template>
    <div
        class="relative py-4 px-2 lg:px-4 rounded-md hover:shadow-md duration-200 bg-zinc-950 cursor-pointer"
    >
        <article>
            <span class="absolute top-0 left-0 w-full h-full" @click="openTask"></span>
            <AppTaskStatus :task-status="task.taskType" />
            <h3 class="text-base font-semibold mt-3">
                {{ task.title }}
            </h3>
            <p class="text-sm text-gray-400">{{ task.description }}</p>
            <div class="flex flex-col md:flex-row justify-between items-center gap-2 mt-6">
                <section class="flex flex-nowrap justify-between w-full">
                    <div>
                        <UAvatar :alt="userAvatar" size="sm" :title="userAvatar" />
                    </div>
                    <div class="flex gap-2 text-xs text-gray-400">
                        <div class="flex items-center gap-1">
                            <Icon name="hugeicons:message-02" class="bg-gray-400 text-base" />
                            <span>{{ task.numberOfComments }} comments</span>
                        </div>

                        <div class="flex items-center gap-1">
                            <Icon name="codex:file" class="bg-gray-400 text-base" />
                            <span>0 files</span>
                        </div>
                    </div>
                </section>
                <div class="absolute top-4 right-3 flex justify-end gap-2">
                    <UButton
                        v-if="!isTaskDone"
                        :icon="btnIcon"
                        :color="btnColor"
                        :title="btnLabel"
                        :aria-label="btnLabel"
                        size="xs"
                        square
                        @click="changeTaskStatus"
                    />
                    <UButton
                        icon="tabler:trash"
                        size="xs"
                        color="red"
                        square
                        title="Delete task"
                        aria-label="Delete task"
                        @click="deleteTask"
                    />
                </div>
            </div>
        </article>
    </div>
</template>

<script lang="ts" setup>
import type { Task } from '~/types/types';

interface Props {
    task: Task;
}

const props = defineProps<Props>();

const emit = defineEmits(['updateTasks', 'updateTaskStatus', 'openTask']);

const toast = useToast();

const isTaskDone = computed(() => props.task.status === 'Done');
const btnIcon = computed(() =>
    props.task.status === 'InProgress'
        ? 'material-symbols:check'
        : 'majesticons:rocket-3-start-line'
);
const btnLabel = computed(() =>
    props.task.status === 'NotStarted' ? 'Start the task' : 'Set task as done'
);
const btnColor = computed(() => (props.task.status === 'NotStarted' ? 'purple' : 'green'));
const taskDate = computed(() => new Date(props.task.date).toLocaleDateString());
const userAvatar = computed(() => props.task.user_id.name + ' ' + props.task.user_id.surname);

async function deleteTask() {
    try {
        await $fetch(`http://localhost:8080/tasks/${props.task._id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        toast.add({
            id: 'success_delete_task',
            title: 'Deleted task',
            description: 'Task deleted successfully',
            color: 'green',
        });

        emit('updateTasks');
    } catch (error) {
        console.error(error);
    }
}

async function changeTaskStatus() {
    try {
        const res = await $fetch<{ message: string; task: Task }>(
            `http://localhost:8080/tasks/status/${props.task._id}`,
            {
                method: 'PUT',
                credentials: 'include',
            }
        );

        toast.add({
            id: 'success_change_task_status',
            title: 'Changed task status',
            description: res.message,
            color: 'green',
        });

        emit('updateTaskStatus', res.task);
    } catch (error) {
        console.error(error);
    }
}

function openTask() {
    emit('openTask');
}
</script>
