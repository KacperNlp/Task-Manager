<template>
  <AppCard class="shadow-lg">
    <form class="w-full max-w-[650px] md:min-w-96">
      <label class="flex flex-col gap-2 mb-3">
        <span class="text-sm text-gray-600">Tytuł</span>
        <input
          v-model="form.name"
          class="text-sm p-2 md:p-4 border rounded-md"
          type="text"
        />
      </label>
      <label class="flex flex-col gap-2 mb-3">
        <span class="text-sm text-gray-600">Opis</span>
        <textarea
          v-model="form.description"
          class="text-sm p-2 md:p-4 border rounded-md"
          type="text"
        />
      </label>
      <label>
        <span class="text-sm text-gray-600">Tytuł</span>
        <select name="user" id="" v-model="form.users" multiple>
          <option v-for="user in users" :key="user._id" :value="user._id">
            {{ user.email }}
          </option>
        </select>
      </label>

      <div class="flex flex-row justify-end gap-2 mt-8">
        <AppButton @click="createNewProject" class="text-sm"
          >Dodaj zadanie</AppButton
        >
        <AppButton @click="$emit('closeForm')" btnType="danger" class="text-sm"
          >Anuluj</AppButton
        >
      </div>
    </form>
  </AppCard>
</template>

<script setup lang="ts">
import type { User, Project } from "../types/types";

const runtimeConfig = useRuntimeConfig();
const emit = defineEmits(["closeForm"]);

const form = reactive<Project>({
  name: "",
  description: "",
  users: [],
});
const users = ref<User[]>([]);

async function fetchAllUsers() {
  try {
    const res = await $fetch<User[]>(
      `${runtimeConfig.public.apiURL}users/all`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    users.value = res;
  } catch (err) {
    console.error(err);
  }
}

async function createNewProject() {
  try {
    await $fetch(`${runtimeConfig.public.apiURL}projects`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(form),
    });

    emit("closeForm");
  } catch (err) {
    console.error(err);
  }
}

await fetchAllUsers();
</script>
