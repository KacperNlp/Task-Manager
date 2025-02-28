<template>
  <div
    class="animate-pulse bg-gray-500 rounded-md"
    :class="{
      'h-4 w-24': size === 'sm',
      'h-6 w-32': size === 'md',
      'h-8 w-48': size === 'xl',
    }"
  ></div>
</template>

<script setup lang="ts">
interface Props {
  size: "sm" | "md" | "xl";
}

defineProps<Props>();
</script>
