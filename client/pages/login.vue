<template>
  <div class="flex justify-center items-center h-screen bg-slate-900">
    <UCard class="w-80 md:w-96 shadow-md">
      <h1 class="text-2xl font-semibold text-center mb-2">
        {{ loginCardTitle }}
      </h1>
      <UForm :state="form" action="POST" class="space-y-4" @submit="submitForm">
        <UFormGroup v-if="!userHasAccount" label="Name" name="name">
          <UInput v-model="form.name" :required="true" type="text" />
        </UFormGroup>
        <UFormGroup v-if="!userHasAccount" label="Surname" name="surname">
          <UInput v-model="form.surname" :required="true" type="text" />
        </UFormGroup>
        <UFormGroup label="E-mail" name="email">
          <UInput v-model="form.email" :required="true" type="email" />
        </UFormGroup>
        <UFormGroup label="Password" name="password">
          <UInput v-model="form.password" :required="true" type="password" />
        </UFormGroup>
        <UFormGroup
          v-if="!userHasAccount"
          label="Repeat password"
          name="repeatPassword"
        >
          <UInput
            v-model="form.repeatPassword"
            :required="true"
            type="password"
          />
        </UFormGroup>
        <UFormGroup v-if="!userHasAccount" label="Role" name="role">
          <USelect
            v-if="!userHasAccount"
            v-model="form.role"
            :options="roleOptions"
          />
        </UFormGroup>
        <div class="flex flex-col gap-2 justify-between mt-4">
          <UButton color="primary" variant="solid" type="submit" block>{{
            loginCardTitle
          }}</UButton>
          <button
            type="button"
            @click="changeUserHasAccount"
            class="text-gray-500 text-sm"
          >
            {{ btnText }}
          </button>
        </div>
      </UForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { UserRoles } from "~/types/types";

definePageMeta({
  layout: "login",
});

const { login, register } = useAuth();

const router = useRouter();

const userHasAccount = ref(true);
const form = reactive({
  name: "",
  surname: "",
  email: "",
  password: "",
  repeatPassword: "",
  role: UserRoles.PM,
});

const loginCardTitle = computed(() => {
  return userHasAccount.value ? "Login" : "Register";
});

const btnText = computed(() => {
  return userHasAccount.value
    ? "Create an account"
    : "Login with existing account";
});

const roleOptions = computed(() => Object.values(UserRoles));

function changeUserHasAccount() {
  userHasAccount.value = !userHasAccount.value;

  form.email = "";
  form.password = "";
  form.repeatPassword = "";
  form.name = "";
  form.surname = "";
}

async function submitForm(e: Event) {
  try {
    e.preventDefault();
    let isSuccesfullyVerified: boolean | undefined = false;

    if (userHasAccount.value) {
      isSuccesfullyVerified = await login(form.email, form.password);
    } else {
      if (form.password !== form.repeatPassword) {
        alert("Passwords do not match");
        return;
      }

      isSuccesfullyVerified = await register(form);
    }

    if (isSuccesfullyVerified) {
      router.push("/");
    }
  } catch (error) {
    console.error(error);
  }
}
</script>
