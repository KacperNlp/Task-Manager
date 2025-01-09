<template>
  <div class="flex justify-center items-center h-screen">
    <AppCard class="shadow-md">
      <form action="POST">
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div v-if="!userHasAccount">
          <label for="password">Repeat Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div class="flex flex-col gap-2 justify-between mt-4">
          <button type="submit">Login</button>
          <AppButton type="button" @click="changeUserHasAccount">
            {{
              userHasAccount
                ? "Create an account"
                : "Login with existing account"
            }}
          </AppButton>
        </div>
      </form>
    </AppCard>
  </div>
</template>
<script>
const { login } = useAuth();

const userHasAccount = ref(true);

function changeUserHasAccount() {
  userHasAccount.value = !userHasAccount.value;
}
</script>
