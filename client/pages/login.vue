<template>
  <div class="flex justify-center items-center h-screen">
    <AppCard class="w-80 md:w-96 shadow-md">
      <h1 class="text-2xl font-semibold text-center mb-2">
        {{ loginCardTitle }}
      </h1>
      <form action="POST">
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
const { login, register } = useAuth();

const router = useRouter();

const userHasAccount = ref(true);
const form = reactive({
  email: "",
  password: "",
  repeatPassword: "",
});

const loginCardTitle = computed(() => {
  return userHasAccount.value ? "Login" : "Register";
});

const btnText = computed(() => {
  return userHasAccount.value
    ? "Create an account"
    : "Login with existing account";
});

function changeUserHasAccount() {
  userHasAccount.value = !userHasAccount.value;

  form.email = "";
  form.password = "";
  form.repeatPassword = "";
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

      isSuccesfullyVerified = await register(form.email, form.password);
    }

    if (isSuccesfullyVerified) {
      router.push("/");
    }
  } catch (error) {
    console.error(error);
  }
}
</script>
