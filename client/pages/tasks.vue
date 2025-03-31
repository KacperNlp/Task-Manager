<template>
  <AppMainTitle class="mb-8">Twoje zadania</AppMainTitle>
  <div class="flex flex-col gap-4 md:table w-full" role="table">
    <div class="hide md:table-header-group" role="rowgroup">
      <div class="md:table-row" role="row">
        <div class="md:table-cell" role="columnheader">
          <span>Nazwa</span>
        </div>
        <div class="md:table-cell" role="columnheader">
          <span>Opis</span>
        </div>
        <div class="md:table-cell" role="columnheader">
          <span>Data</span>
        </div>
        <div class="md:table-cell" role="columnheader">
          <span>Status</span>
        </div>
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
