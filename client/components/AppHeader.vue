<template>
  <header class="header w-full shadow p-4">
    <nav class="flex justify-between items-center max-w-7xl mx-auto">
      <AppButton btn-type="primary" class="flex items-center gap-1">
        <Icon name="ic:baseline-plus" class="bg-gray-50 text-xl" />
        Dodaj projekt
      </AppButton>
      <button
        class="block ml-auto"
        aria-label="Wyloguj się"
        title="Wyloguj się"
        @click="logoutUser"
      >
        <Icon name="quill:off" class="bg-rose-500 hover:bg-rose-700 text-2xl" />
      </button>
    </nav>
  </header>
</template>

<script lang="ts" setup>
const { logout } = useAuth();

const router = useRouter();

async function logoutUser() {
  try {
    await logout();
    router.push("/login");
  } catch (error) {
    console.error(error);
  }
}
</script>
