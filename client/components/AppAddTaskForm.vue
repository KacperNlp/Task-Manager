<template>
  <form class="w-full max-w-[650px] min-w-96">
    <label class="flex flex-col gap-2 mb-3">
      <span class="text-sm text-gray-600">Tytuł</span>
      <input
        v-model="form.title"
        class="text-sm p-2 md:p-4 border rounded-md"
        type="text"
      />
    </label>
    <label class="flex flex-col gap-2 mb-3">
      <span class="text-sm text-gray-600">Opis</span>
      <textarea
        v-model="form.description"
        class="text-sm p-2 md:p-4 border rounded-md"
      />
    </label>
    <label class="flex flex-col gap-2 mb-3">
      <span class="text-sm text-gray-600">Data realizacji</span>
      <input
        v-model="form.date"
        :min="minDate"
        class="text-sm p-2 md:p-4 border rounded-md"
        type="date"
      />
    </label>

    <div class="flex flex-row justify-end gap-2 mt-8">
      <AppButton @click="addTask" class="text-sm">Dodaj zadanie</AppButton>
      <AppButton @click="$emit('closeForm')" btnType="danger" class="text-sm"
        >Anuluj</AppButton
      >
    </div>
  </form>
</template>

<script setup lang="ts">
const form = reactive({
  title: "",
  description: "",
  date: new Date().toISOString().slice(0, 10),
});

const emit = defineEmits(["closeForm"]);

const minDate = computed(() => new Date().toISOString().slice(0, 10));

async function addTask() {
  try {
    const formData = { ...form };
    console.log(formData);
    await $fetch("http://localhost:8080/tasks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
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
