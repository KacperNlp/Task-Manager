<template>
  <ul class="flex gap-8">
    <li v-for="(actionBtn, id) in actionsButtons" @key="id">
      <Icon
        :name="actionBtn.icon"
        class="bg-gray-400 text-2xl hover:bg-emerald-500 cursor-pointer"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
const actionsButtons = [
  {
    icon: "famicons:calendar-outline",
  },
  {
    icon: "token:chat",
  },
  {
    icon: "fluent:alert-16-regular",
  },
];

function openCalendar() {
  console.log("Open calendar");
}

function openChat() {
  console.log("Open chat");
}

function openAlerts() {
  console.log("Open alerts");
}
</script>
