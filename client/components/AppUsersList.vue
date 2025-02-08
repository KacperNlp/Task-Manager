<template>
  <div class="flex items-center gap-4">
    <UButton
      icon="cuida:plus-outline"
      size="xs"
      color="primary"
      square
      variant="solid"
      aria-label="Invite another user"
      @click="inviteUser"
      >Invite</UButton
    >

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
