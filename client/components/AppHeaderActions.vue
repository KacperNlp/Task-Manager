<template>
  <ul class="flex gap-8">
    <li v-for="(actionBtn, id) in actionsButtons" @key="id">
      <Icon
        :name="actionBtn.icon"
        class="bg-gray-400 text-2xl hover:bg-emerald-500 cursor-pointer"
        @click="actionBtn.onClick"
      />
    </li>
  </ul>

  <UModal v-model="isAlertsOpen">
    <AppNotificationsList />
  </UModal>
</template>

<script setup lang="ts">
const actionsButtons = [
  {
    icon: "famicons:calendar-outline",
    onClick: openCalendar,
  },
  {
    icon: "fluent:alert-16-regular",
    onClick: openAlerts,
  },
];

const isAlertsOpen = ref(false);

function openCalendar() {
  console.log("Open calendar");
}

function openAlerts() {
  isAlertsOpen.value = !isAlertsOpen.value;
}
</script>
