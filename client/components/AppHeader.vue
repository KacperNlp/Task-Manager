<template>
  <header class="header w-full shadow p-4">
    <nav class="max-w-7xl mx-auto">
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
