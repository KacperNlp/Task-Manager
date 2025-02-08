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

      <div class="flex flex-row justify-end gap-2 mt-8">
        <UButton color="primary" type="submit">Dodaj zadanie</UButton>
        <UButton @click="$emit('closeForm')" color="red">Anuluj</UButton>
      </div>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import TasksManager from "~/services/TasksManager";
import type { NewTask } from "@/types/types";

const TASKS_IMPORTANCE = ["Low", "Medium", "Hight"];

const store = useWebsiteStore();

const form = reactive<NewTask>({
  title: "",
  description: "",
  date: new Date().toISOString().slice(0, 10),
  taskType: "Low",
  projectId: "",
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
</script>
