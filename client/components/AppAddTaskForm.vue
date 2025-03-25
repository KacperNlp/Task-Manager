<template>
  <UCard class="shadow-lg">
    <UForm
      :state="form"
      class="space-y-4 w-full max-w-[650px] md:min-w-96"
      @submit="addTask"
    >
      <UFormGroup label="Task title" name="title">
        <UInput v-model="form.title" :required="true" type="text" />
      </UFormGroup>
      <UFormGroup label="Description" name="desc">
        <UInput v-model="form.description" :required="true" type="text" />
      </UFormGroup>
      <UFormGroup label="Date" name="date">
        <UInput
          v-model="form.date"
          :required="true"
          :min="minDate"
          type="date"
        />
      </UFormGroup>
      <UFormGroup label="Task priority" name="priority">
        <USelect v-model="form.taskType" :options="TASKS_IMPORTANCE" />
      </UFormGroup>
      <UFormGroup label="Assign user" name="users">
        <USelectMenu
          v-model="form.userId"
          :options="users"
          placeholder="Select people"
          value-attribute="_id"
          option-attribute="name"
        >
          <template #option="{ option: person }">
            <span class="text-xs">
              {{ person.name }} {{ person.surname }} - {{ person.role }}
            </span>
          </template>
        </USelectMenu>
      </UFormGroup>

      <div class="flex flex-row justify-end gap-2 mt-8">
        <UButton color="primary" type="submit">Dodaj zadanie</UButton>
        <UButton @click="$emit('closeForm')" color="red">Anuluj</UButton>
      </div>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import TasksManager from "~/services/TasksManager";
import UsersManager from "../services/UsersManager";
import type { User, NewTask } from "@/types/types";

const TASKS_IMPORTANCE = ["Low", "Medium", "Hight"];

const store = useProjectsStore();
const toast = useToast();

const users = ref<User[]>([]);

const form = reactive<NewTask>({
  title: "",
  description: "",
  date: new Date().toISOString().slice(0, 10),
  taskType: "Low",
  projectId: "",
  userId: "",
});

const emit = defineEmits(["closeForm", "updateTasks"]);

const minDate = computed(() => new Date().toISOString().slice(0, 10));

async function addTask() {
  try {
    form.projectId = store.currentProjectId;
    const formData = { ...form };

    await TasksManager.createNewTask(formData);

    emit("updateTasks");

    form.title = "";
    form.description = "";
    form.date = "";
  } catch (error) {
    console.error(error);
  }
}

async function fetchAllUsers() {
  try {
    const res = await UsersManager.getUsers(store.currentProjectId);

    users.value = res;
  } catch (err) {
    console.error(err);
  }
}

onMounted(async () => {
  await fetchAllUsers();
});
</script>
