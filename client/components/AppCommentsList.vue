<template>
  <ul v-if="isAnyComment" class="flex flex-col gap-2">
    <li v-for="comment in comments" :key="comment._id">
      <AppComment :comment="comment" />
    </li>
  </ul>
  <div v-else class="flex justify-center items-center h-32">
    <span class="text-sm text-gray-600">Brak komentarzy...</span>
  </div>
</template>
<script lang="ts" setup>
import type { Comment } from "../types/types";

interface Props {
  comments: Comment[] | null;
}

const props = defineProps<Props>();

const isAnyComment = computed(() => !!props.comments?.length);
</script>
