<template>
  <ul v-if="isNotificationsNotEmpty" class="flex flex-col gap-2">
    <li
      v-for="notification in notificationsStore.notifications"
      :key="notification._id"
    >
      <UAlert :title="notification.title" :description="notification.message" />
    </li>
  </ul>
  <div v-else class="flex justify-center items-center h-32">
    <span class="text-sm text-gray-400">No notifications...</span>
  </div>
</template>
<script setup lang="ts">
const notificationsStore = useNotificationsStore();

const isNotificationsNotEmpty = computed(() => {
  return notificationsStore.notifications.length;
});
</script>
