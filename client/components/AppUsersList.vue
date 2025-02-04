<template>
  <div class="flex items-center gap-4">
    <button @click="inviteUser" class="flex items-center gap-2 text-blue-700">
      <span
        class="flex items-center bg-blue-200 p-1 border border-blue-200 hover:border-blue-700 duration-200 rounded-md"
      >
        <Icon name="cuida:plus-outline" class="h-3 w-3 text-blue-700 ms-auto" />
      </span>
      Invite
    </button>

    <UAvatarGroup size="sm" :max="2">
      <UAvatar
        src="https://avatars.githubusercontent.com/u/739984?v=4"
        alt="benjamincanac"
      />
      <UAvatar
        src="https://avatars.githubusercontent.com/u/904724?v=4"
        alt="Atinux"
      />
      <UAvatar
        src="https://avatars.githubusercontent.com/u/7547335?v=4"
        alt="smarroufin"
      />
    </UAvatarGroup>
  </div>
</template>
<script setup lang="ts">
function inviteUser() {
  console.log("Invite");
}
</script>
