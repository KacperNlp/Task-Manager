<template>
  <main>
    <AppMainTitle class="mb-8">Settings</AppMainTitle>
    <UCard class="max-w-2xl">
      <UForm
        :schema="schema"
        :state="userData"
        @submit="handleSubmit"
        class="space-y-8"
      >
        <div class="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-y-8">
          <UFormGroup label="Name" name="name">
            <UInput v-model="userData.name" size="lg" />
          </UFormGroup>
          <UFormGroup label="Surname" name="surname">
            <UInput v-model="userData.surname" size="lg" />
          </UFormGroup>
          <UFormGroup label="Email" name="email">
            <UInput v-model="userData.email" size="lg" />
          </UFormGroup>
          <UFormGroup label="Password" name="password">
            <UInput v-model="userData.password" type="password" size="lg" />
          </UFormGroup>
        </div>
        <UButton type="submit" size="lg">Submit</UButton>
      </UForm>
    </UCard>
  </main>
</template>

<script setup lang="ts">
import { object, string, type InferType } from "yup";
import UsersManager from "~/services/UsersManager";

const schema = object({
  name: string().required("Name is required"),
  surname: string().required("Surname is required"),
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

const usersStore = useUsersStore();
const toast = useToast();

type Schema = InferType<typeof schema>;

const userData = ref<Schema>({
  name: usersStore.loggedUser?.name || "",
  surname: usersStore.loggedUser?.surname || "",
  email: usersStore.loggedUser?.email || "",
  password: usersStore.loggedUser?.password || "",
});

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await UsersManager.updateUser(event.data);
    usersStore.fetchLoggedUser();

    toast.add({
      title: "User updated",
      description: "Your data has been updated",
      icon: "i-heroicons-check-circle",
      color: "green",
    });
  } catch (error) {
    console.error(error);

    toast.add({
      title: "User not updated",
      description: "Your data has not been updated",
      icon: "i-heroicons-x-circle",
      color: "red",
    });
  }
}
</script>
