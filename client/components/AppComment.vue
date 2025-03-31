<template>
  <UCard>
    <div class="flex gap-6 flex-row">
      <UAvatar
        src="https://avatars.githubusercontent.com/u/739984?v=4"
        alt="Avatar"
      />
      <div class="w-full">
        <div class="flex justify-between mb-3">
          <strong class="block text-sm">{{
            isCommentFromLoggedUser ? "You" : comment.user.email
          }}</strong>
          <span class="text-sm font-bold text-gray-400">{{
            dateOfComment
          }}</span>
        </div>
        <p class="text-sm font-light leading-6">
          {{ comment.text }}
        </p>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { Comment } from "../types/types";

interface Props {
  comment: Comment;
}

const user = useUsersStore();

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

const isCommentFromLoggedUser = computed(() => {
  return props.comment.user._id === user.loggedUser?._id;
});
</script>
