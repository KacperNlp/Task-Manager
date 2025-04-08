<template>
    <AppMainTitle class="mb-8">Twoje zadania</AppMainTitle>
    <div class="flex flex-col gap-4 md:table w-full" role="table">
        <div class="hidden md:table-header-group" role="rowgroup">
            <div class="md:table-row" role="row">
                <div class="md:table-cell md:py-3 md:px-2 md:bg-gray-800" role="columnheader">
                    <span>Nazwa</span>
                </div>
                <div class="md:table-cell md:py-3 md:px-2 md:bg-gray-800" role="columnheader">
                    <span>Opis</span>
                </div>
                <div class="md:table-cell md:py-3 md:px-2 md:bg-gray-800" role="columnheader">
                    <span>Data</span>
                </div>
                <div class="md:table-cell md:py-3 md:px-2 md:bg-gray-800" role="columnheader">
                    <span>Status</span>
                </div>
                <div class="md:table-cell md:py-3 md:px-2 md:bg-gray-800" role="columnheader"></div>
            </div>
        </div>
        <div
            v-for="task in loggedUserTasks"
            :key="task._id"
            role="rowgroup"
            class="md:table-row-group"
        >
            <AppCardHorizontal :task="task" />
        </div>
    </div>
    <div v-if="!loggedUserTasks.length" class="mt-10">
        <p class="text-center text-gray-400">No tasks found</p>
    </div>
</template>

<script setup lang="ts">
const tasksStore = useTasksStore();
const usersStore = useUsersStore();

const loggedUserTasks = computed(() => tasksStore.loggedUserTasks);

onMounted(async () => {
    if (usersStore.loggedUser?._id) {
        await tasksStore.fetchAllTasksOfLoggedUser(usersStore.loggedUser?._id);
    }
});
</script>
