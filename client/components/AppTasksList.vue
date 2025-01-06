<template>
    <ul>
        <li v-for="task in tasks" @key="task.id">
            <h3>{{ task.title }}</h3>
            <p>{{ task.description }}</p>
        </li>
    </ul>
</template>
<script setup lang="ts">
import type { Task } from '../types';

const tasks = ref<Task[]>([]);

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

await getUserTasks();
</script>