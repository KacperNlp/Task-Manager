<template>
  <header
    class="flex flex-nowrap items-center h-[88px] header w-full border py-4 pl-[270px] pr-16"
  >
    <AppSearch />
    <div class="flex flex-nowrap gap-24 ml-auto">
      <AppHeaderActions />
      <nav class="flex justify-between items-center max-w-7xl mx-auto">
        <button
          class="block ml-auto"
          aria-label="Wyloguj się"
          title="Wyloguj się"
          @click="logoutUser"
        >
          <Icon
            name="quill:off"
            class="bg-rose-500 hover:bg-rose-700 text-2xl"
          />
        </button>
      </nav>
    </div>
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
