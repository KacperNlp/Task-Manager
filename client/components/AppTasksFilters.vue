<template>
    <div class="flex flex-row gap-4">
        <USelectMenu v-model="filtersStore.filters.taskType" :options="taskTypes" label="Status" />
        <USelectMenu
            v-model="filtersStore.filters.assignedTo"
            :options="usersList"
            option-attribute="name"
            label="Assigned to"
        />
    </div>
</template>

<script setup lang="ts">
const projectsStore = useProjectsStore();
const filtersStore = useFiltersStore();

const taskTypes = ['All', 'Low', 'Medium', 'Hight'];

const usersList = computed(() => {
    const users = [
        filtersStore.getDefaultAssignedTo,
        ...projectsStore.currentProjectUsers.map(user => ({
            name: user.name,
            value: user._id,
        })),
    ];

    return users;
});
</script>
