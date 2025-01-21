<template>
  <ul class="flex flex-col gap-2">
    <li v-for="comment in comments" :key="comment._id">
      <AppComment />
    </li>
  </ul>
</template>
<script lang="ts" setup>
import type { Comment } from "../types/types";

interface Props {
  comments: Comment[];
}

defineProps<Props>();
</script>
