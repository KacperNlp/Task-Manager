<template>
  <div
    class="fixed w-dvw h-dvh bg-gray-900/40 flex justify-center items-center inset-0 z-10"
  >
    <button
      @click="closeLayer"
      class="absolute top-2 md:top-4 right-2 md:right-6 flex items-center justify-center p-3 px-3 border rounded-full bg-red-600 hover:bg-red-700 duration-200"
    >
      <Icon name="material-symbols:close" class="bg-gray-50 text-2xl" />
    </button>
    <slot />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["closeLayer"]);

function closeLayer() {
  emit("closeLayer");
}
</script>
