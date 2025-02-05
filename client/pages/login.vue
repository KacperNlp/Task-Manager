<template>
  <div class="flex justify-center items-center h-screen bg-slate-900">
    <AppCard class="w-80 md:w-96 shadow-md">
      <h1 class="text-2xl font-semibold text-center mb-2">
        {{ loginCardTitle }}
      </h1>
      <form action="POST">
        <AppInput
          v-if="!userHasAccount"
          v-model="form.name"
          :is-required="true"
          type="text"
          inputId="name"
          name="name"
          label="Name"
        />
        <AppInput
          v-if="!userHasAccount"
          v-model="form.surname"
          :is-required="true"
          type="text"
          inputId="surname"
          name="surname"
          label="Surname"
        />
        <AppInput
          v-model="form.email"
          :is-required="true"
          type="email"
          inputId="email"
          name="email"
          label="Email"
        />
        <AppInput
          v-model="form.password"
          :is-required="true"
          type="password"
          inputId="password"
          name="password"
          label="Password"
        />
        <AppInput
          v-if="!userHasAccount"
          v-model="form.repeatPassword"
          :is-required="true"
          type="password"
          inputId="repeatPassword"
          name="repeatPassword"
          label="Repeat password"
        />
        <USelect
          v-if="!userHasAccount"
          v-model="form.role"
          :options="roleOptions"
        />
        <div class="flex flex-col gap-2 justify-between mt-4">
          <AppButton @click="submitForm" btn-type="primary" type="submit">{{
            loginCardTitle
          }}</AppButton>
          <button
            type="button"
            @click="changeUserHasAccount"
            class="text-gray-500 text-sm"
          >
            {{ btnText }}
          </button>
        </div>
      </form>
    </AppCard>
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
