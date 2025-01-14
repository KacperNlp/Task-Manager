<template>
  <form>
    <label class="flex flex-col gap-2 mb-3">
      <span class="text-sm text-gray-600">Tytuł</span>
      <input v-model="form.title" class="text-sm p-2 md:p-4 border rounded-md" type="text" />
    </label>
    <label class="flex flex-col gap-2 mb-3">
      <span class="text-sm text-gray-600">Opis</span>
      <textarea v-model="form.description" class="text-sm p-2 md:p-4 border rounded-md" />
    </label>

    <div class="flex flex-row justify-end gap-2 mt-4">
      <AppButton @click="addTask" class="text-sm">Dodaj zadanie</AppButton>
      <AppButton @click="$emit('closeForm')" btnType="danger" class="text-sm">Anuluj</AppButton>
    </div>
  </form>
</template>

<script setup lang="ts">
const form = reactive({
  title: "",
  description: "",
  date: "",
});

const emit = defineEmits(["closeForm"]);

const userId = useCookie("user_id");

async function addTask() {
  try {
    const formData = { ...form, userId: userId.value };
    console.log(formData);
    await $fetch("http://localhost:8080/tasks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    emit("updateTasks");

    form.title = "";
    form.description = "";
    form.date = "";
  } catch (error) {
    console.error(error);
  }
}
</script>
