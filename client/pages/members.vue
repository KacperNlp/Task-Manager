<template>
  <AppMainTitle class="mb-8"
    >Członkowie projektu: {{ projectsStore.currentProject?.name }}</AppMainTitle
  >
  <ul
    v-if="!isLoading && users.length > 0"
    class="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
  >
    <li v-for="user in users" :key="user._id">
      <UCard>
        <div class="text-center py-4">
          <div class="mb-4">
            <UAvatar
              size="xl"
              src="https://avatars.githubusercontent.com/u/739984?v=4"
              alt="Avatar"
            />
          </div>
          <h2 class="text-lg font-semibold">
            {{ user.name }} {{ user.surname }}
          </h2>
          <strong class="text-sm text-gray-400">{{ user.role }}</strong>
        </div>
      </UCard>
    </li>
  </ul>
  <div
    v-else-if="isLoading"
    class="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
  >
    <div v-for="i in 8" :key="i" class="flex items-center">
      <UCard>
        <div class="flex flex-col items-center">
          <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
          <div class="space-y-2 mt-2">
            <USkeleton class="h-4 w-[250px]" />
            <USkeleton class="h-4 w-[200px]" />
          </div>
        </div>
      </UCard>
    </div>
  </div>
  <div v-else class="flex justify-center items-center">
    <UButton>Dodaj członka</UButton>
  </div>
</template>

<script setup lang="ts">
import UsersManager from "../services/UsersManager";
import type { User } from "../types/types";

const projectsStore = useProjectsStore();

const users = ref<User[]>([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    isLoading.value = true;
    const res = await UsersManager.getUsers(projectsStore.currentProject?._id);

    users.value = res;
    isLoading.value = false;
  } catch (err) {
    console.error(err);
  }
});
</script>
