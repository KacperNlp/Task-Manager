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
      <label class="flex flex-col gap-2 mb-3">
        <span class="text-sm text-gray-600">Opis</span>
        <input
          v-model="form.color"
          class="text-sm border rounded-md"
          type="color"
        />
      </label>
      <label>
        <span class="text-sm text-gray-600">Przypisani użytkownicy</span>
        <USelectMenu
          v-model="form.users"
          :options="users"
          placeholder="Select people"
          value-attribute="_id"
          option-attribute="name"
          multiple
        >
          <template #option="{ option: person }">
            <span class="text-xs">
              {{ person.name }} {{ person.surname }} - {{ person.role }}
            </span>
          </template>
        </USelectMenu>
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
import ProjectsManager from "../services/ProjectsManager";
import UsersManager from "../services/UsersManager";
import type { User, Project } from "../types/types";

const emit = defineEmits(["closeForm"]);

const form = reactive<Project>({
  name: "",
  description: "",
  color: "#fff",
  users: [],
});
const users = ref<User[]>([]);

async function fetchAllUsers() {
  try {
    const res = await UsersManager.getUsers();

    users.value = res;
  } catch (err) {
    console.error(err);
  }
}

async function createNewProject() {
  try {
    await ProjectsManager.createProject(form);
    emit("closeForm");
  } catch (err) {
    console.error(err);
  }
}

onMounted(async () => {
  await fetchAllUsers();
});
</script>
