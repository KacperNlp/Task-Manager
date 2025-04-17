<template>
    <div class="flex items-center gap-4">
        <UButton
            icon="cuida:plus-outline"
            size="xs"
            color="primary"
            square
            variant="solid"
            aria-label="Invite another user"
            @click="openInviteUserModal"
            >Invite</UButton
        >

        <UAvatarGroup size="sm" :max="2">
            <UAvatar
                v-for="user in projectsStore.currentProjectUsers"
                :key="user._id"
                :alt="getUserAvatar(user.name, user.surname)"
            />
        </UAvatarGroup>
    </div>

    <UModal v-model="isModalOpen">
        <AppInviteUserForm @close="closeInviteUserModal" />
    </UModal>
</template>
<script setup lang="ts">
const projectsStore = useProjectsStore();

const isModalOpen = ref(false);

function openInviteUserModal() {
    isModalOpen.value = true;
}

function closeInviteUserModal() {
    isModalOpen.value = false;
}

function getUserAvatar(userName: string, userSurname: string) {
    return userName + ' ' + userSurname;
}
</script>
