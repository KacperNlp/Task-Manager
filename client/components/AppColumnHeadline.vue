<template>
  <h2
    class="flex gap-2 items-center font-semibold pb-5 mb-7 border-b-2"
    :class="{
      'border-blue-500': columnType === 'toDo',
      'border-orange-500': columnType === 'progress',
      'border-green-500': columnType === 'done',
    }"
  >
    <span
      class="w-2 h-2 rounded-full inline-block"
      :class="{
        'bg-blue-500': columnType === 'toDo',
        'bg-orange-500': columnType === 'progress',
        'bg-green-500': columnType === 'done',
      }"
    ></span>
    {{ text }}
    <span
      class="flex items-center justify-center w-4 h-4 bg-gray-700 text-gray-200 text-xs rounded-xl"
    >
      {{ count }}
    </span>
    <slot />
  </h2>
</template>

<script setup lang="ts">
interface Props {
  count: number;
  text: string;
  columnType: "toDo" | "progress" | "done";
}

defineProps<Props>();
</script>
