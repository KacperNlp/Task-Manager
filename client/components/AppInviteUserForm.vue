<template>
    <UCard class="shadow-lg">
        <UForm
            :state="{ userId: newUserId }"
            class="space-y-4 w-full max-w-[650px] md:min-w-96"
            @submit="inviteUser"
        >
            <UFormGroup label="Assign users" name="users">
                <USelectMenu
                    v-model="newUserId"
                    :options="users"
                    placeholder="Select people"
                    value-attribute="_id"
                    option-attribute="name"
                >
                    <template #option="{ option: person }">
                        <span class="text-xs">
                            {{ person.name }} {{ person.surname }} - {{ person.role }}
                        </span>
                    </template>
                </USelectMenu>
            </UFormGroup>

            <div class="flex flex-row justify-end gap-2 mt-8">
                <UButton color="primary" type="submit">Invite</UButton>
                <UButton @click="closeInviteUserModal" color="red">Cancel</UButton>
            </div>
        </UForm>
    </UCard>
</template>

<script setup lang="ts">
import UsersManager from '@/services/UsersManager';
import ProjectsManager from '@/services/ProjectsManager';
import type { User } from '@/types/types';

const projectStore = useProjectsStore();

const toast = useToast();

const emit = defineEmits(['close']);

const users = ref<User[]>([]);
const newUserId = ref<string>('');

function closeInviteUserModal() {
    emit('close');
    newUserId.value = '';
}

async function fetchAllUsers() {
    try {
        if (!projectStore.currentProject) return;

        const res = await UsersManager.getUsersNotAssignedToProject(
            projectStore.currentProject._id
        );

        users.value = res;
    } catch (err) {
        console.error(err);
    }
}

async function inviteUser() {
    try {
        if (!projectStore.currentProject) return;

        await ProjectsManager.addUserToProject(projectStore.currentProject._id, newUserId.value);

        closeInviteUserModal();

        toast.add({
            id: 'success_invite_user',
            title: 'Success',
            description: 'User invited successfully',
        });
    } catch (err) {
        console.error(err);
        console.log(err);

        toast.add({
            id: 'error_invite_user',
            title: 'Error',
            description: 'User not invited',
        });
    }
}

onMounted(async () => {
    await fetchAllUsers();
    console.log(users.value);
});
</script>
