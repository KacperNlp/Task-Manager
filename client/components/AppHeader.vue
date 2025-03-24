<template>
  <header
    class="flex flex-nowrap items-center h-[88px] header w-full border-b border-b-zinc-600 py-2 px-4 gap-4"
  >
    <div class="md:w-[280px]">
      <button @click="handleToggleSidebar" aria-label="Show sidebar">
        <Icon name="mingcute:arrows-right-line" class="bg-gray-400 text-2xl" />
      </button>
    </div>
    <AppSearch />
    <div class="flex flex-nowrap items-center gap-3 md:gap-16 ml-auto">
      <AppHeaderActions />
      <AppLoggedUser />
    </div>
    <teleport to="body">
      <AppSidebar
        :isSidebarActive="isSidebarActive"
        @changeSidebarVisibility="isSidebarActive = $event"
      />
    </teleport>
  </header>
</template>

<script setup lang="ts">
const isSidebarActive = ref(true);

function handleToggleSidebar() {
  isSidebarActive.value = !isSidebarActive.value;
}
</script>
