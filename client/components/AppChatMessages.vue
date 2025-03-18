<template>
  <div
    v-if="isYourMessage"
    class="self-end bg-primary-500 text-primary-50 p-2 rounded-md max-w-xs"
  >
    {{ message }}
  </div>
  <div v-else class="flex flex-col gap-2">
    <div class="flex flex-row gap-2">
      <span class="block w-4 h-4 bg-slate-300"></span>
      <span class="text-xs">{{ isYourMessage ? "You" : user || "" }}</span>
    </div>
    <div
      class="self-start bg-primary-200 text-neutral-950 p-2 rounded-md max-w-xs"
    >
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message: string;
  user: string;
  userId: string;
}

const usersStore = useUsersStore();

const props = defineProps<Props>();

const isYourMessage = computed(
  () => props.userId === usersStore.loggedUser?._id
);
</script>
