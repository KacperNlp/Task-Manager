<template>
  <UCard class="shadow-lg">
    <UForm
      :state="form"
      class="space-y-4 w-full max-w-[650px] md:min-w-96"
      @submit="createNewProject"
    >
      <UFormGroup label="Project name" name="name">
        <UInput v-model="form.name" :required="true" type="text" />
      </UFormGroup>
      <UFormGroup label="Description" name="desc">
        <UTextarea v-model="form.description" :required="true" type="text" />
      </UFormGroup>
      <UFormGroup label="Color" name="color">
        <UInput v-model="form.color" :required="true" type="color" />
      </UFormGroup>
      <UFormGroup label="Assign users" name="users">
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
      </UFormGroup>

      <div class="flex flex-row justify-end gap-2 mt-8">
        <UButton color="primary">Dodaj zadanie</UButton>
        <UButton @click="$emit('closeForm')" color="red">Anuluj</UButton>
      </div>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import ProjectsManager from "../services/ProjectsManager";
import UsersManager from "../services/UsersManager";
import type { User, NewProject } from "../types/types";

const store = useWebsiteStore();

const emit = defineEmits(["closeForm"]);

const form = reactive<NewProject>({
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
    await store.fetchProjectsList();
    emit("closeForm");
  } catch (err) {
    console.error(err);
  }
}

onMounted(async () => {
  await fetchAllUsers();
});
</script>
