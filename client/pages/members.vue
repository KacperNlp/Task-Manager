<template>
  <AppMainTitle class="mb-8"
    >Członkowie projektu: {{ projectsStore.currentProject?.name }}</AppMainTitle
  >
  <ul
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
</template>

<script setup lang="ts">
import UsersManager from "../services/UsersManager";
import type { User } from "../types/types";

const projectsStore = useProjectsStore();

const users = ref<User[]>([]);

onMounted(async () => {
  try {
    const res = await UsersManager.getUsers(projectsStore.currentProject?._id);

    users.value = res;
  } catch (err) {
    console.error(err);
  }
});
</script>
