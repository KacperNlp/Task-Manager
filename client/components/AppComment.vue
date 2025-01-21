<template>
  <div class="flex flex-row gap-4 lg:gap-8 p-4 md:p-6 bg-slate-50 shadow-md">
    <div class="min-w-8 h-8 border rounder-full"></div>
    <div class="w-full">
      <div class="flex justify-between mb-2">
        <strong class="block text-sm">{{ comment.user.email }}</strong>
        <span class="text-sm font-bold text-gray-600">{{ dateOfComment }}</span>
      </div>
      <p class="text-sm font-light leading-6">
        {{ comment.text }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Comment } from "../types/types";

interface Props {
  comment: Comment;
}

const props = defineProps<Props>();

const dateOfComment = computed(() => {
  const dateFromBE = new Date(props.comment.date);
  const now = new Date();

  const diffInMs = now.getTime() - dateFromBE.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Dzisiaj";
  if (diffInDays === 1) return "1 dzień temu";
  if (diffInDays <= 4) return `${diffInDays} dni temu`; // For 2, 3, or 4 days
  return `${diffInDays} dni temu`; // For 5+ days
});
</script>
