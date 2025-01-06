<template>
    <ul class="flex flex-col gap-2">
        <li v-for="task in tasks" @key="task.id" class="relative py-6 border-b">
            <h3 class="text-lg font-semibold">{{ task.title }}</h3>
            <p class="text-sm text-gray-600">{{ task.description }}</p>
            <div class="absolute bottom-2 right-0 flex justify-end">
                <AppButton class="text-sm" btnType="danger">
                    Usuń
                </AppButton>
            </div>
        </li>
        <li class="mt-4">
            <AppButton v-show="!formIsActive" @click="changeAddTaskFormVisivility" class="text-sm">
                + Dodaj nowe zadanie
            </AppButton>
            <AppCard v-show="formIsActive">
                <AppAddTaskForm @closeForm="changeAddTaskFormVisivility" />
            </AppCard>
        </li>
    </ul>
</template>
<script setup lang="ts">
import type { Task } from '../types';

const tasks = ref<Task[]>([]);
const formIsActive = ref(false);

async function getUserTasks() {
    try {
        const response = [
            {
                id: 1,
                title: 'Task 1',
                description: 'Description 1'
            },
            {
                id: 2,
                title: 'Task 2',
                description: 'Description 2'
            }
        ];

        tasks.value = response;
    } catch (error) {
        console.error(error); 
    }
}

function changeAddTaskFormVisivility() {
    formIsActive.value = !formIsActive.value;
}

await getUserTasks();
</script>