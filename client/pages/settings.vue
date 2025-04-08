<template>
    <main>
        <AppMainTitle class="mb-8">Settings</AppMainTitle>
        <section class="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
            <UCard class="max-w-2xl">
                <UForm :schema="schema" :state="userData" @submit="handleSubmit" class="space-y-8">
                    <div class="flex flex-col gap-4">
                        <UFormGroup label="Name" name="name">
                            <UInput v-model="userData.name" size="lg" />
                        </UFormGroup>
                        <UFormGroup label="Surname" name="surname">
                            <UInput v-model="userData.surname" size="lg" />
                        </UFormGroup>
                        <UFormGroup label="Email" name="email">
                            <UInput v-model="userData.email" size="lg" />
                        </UFormGroup>
                    </div>
                    <UButton type="submit" size="lg">Submit</UButton>
                </UForm>
            </UCard>
            <UCard class="max-w-2xl">
                <UForm
                    :schema="confirmPasswordSchema"
                    :state="confirmPasswordData"
                    @submit="handleSubmitPassword"
                    class="space-y-8"
                >
                    <UFormGroup class="mb-8" label="Enable Change Password" name="changePassword">
                        <UCheckbox v-model="confirmPasswordData.enableChangePassword" />
                    </UFormGroup>
                    <UFormGroup label="Password" name="password">
                        <UInput
                            v-model="confirmPasswordData.password"
                            type="password"
                            size="lg"
                            :disabled="!confirmPasswordData.enableChangePassword"
                        />
                    </UFormGroup>
                    <UFormGroup label="Confirm Password" name="confirmPassword">
                        <UInput
                            v-model="confirmPasswordData.confirmPassword"
                            type="password"
                            size="lg"
                            :disabled="!confirmPasswordData.enableChangePassword"
                        />
                    </UFormGroup>
                    <UButton
                        type="submit"
                        size="lg"
                        :disabled="!confirmPasswordData.enableChangePassword"
                        >Submit Password</UButton
                    >
                </UForm>
            </UCard>
        </section>
    </main>
</template>

<script setup lang="ts">
import { object, string, boolean, type InferType, ref as yupRef } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
import UsersManager from '~/services/UsersManager';

const schema = object({
    name: string().required('Name is required'),
    surname: string().required('Surname is required'),
    email: string().email('Invalid email').required('Email is required'),
});

const confirmPasswordSchema = object({
    enableChangePassword: boolean(),
    password: string().when('enableChangePassword', {
        is: true,
        then: passwordSchema =>
            passwordSchema
                .required('Password is required')
                .min(8, 'Password must be at least 8 characters long'),
        otherwise: passwordSchema => passwordSchema.notRequired().strip(),
    }),
    confirmPassword: string().when('enableChangePassword', {
        is: true,
        then: passwordSchema =>
            passwordSchema
                .required('Confirm Password is required')
                .oneOf([yupRef('password')], 'Passwords must match'),
        otherwise: passwordSchema => passwordSchema.notRequired().strip(),
    }),
});

const usersStore = useUsersStore();
const toast = useToast();

type Schema = InferType<typeof schema>;
type ConfirmPasswordSchema = InferType<typeof confirmPasswordSchema>;

const userData = ref<Schema>({
    name: usersStore.loggedUser?.name || '',
    surname: usersStore.loggedUser?.surname || '',
    email: usersStore.loggedUser?.email || '',
});

const confirmPasswordData = ref<ConfirmPasswordSchema>({
    password: '',
    confirmPassword: '',
    enableChangePassword: false,
});

async function handleSubmit(event: FormSubmitEvent<Schema>) {
    try {
        const res = await UsersManager.updateUser(event.data);
        usersStore.fetchLoggedUser();

        toast.add({
            title: 'User updated',
            description: res?.message || 'Your data has been updated',
            icon: 'i-heroicons-check-circle',
            color: 'green',
        });
    } catch (error) {
        console.error(error);

        toast.add({
            title: 'User not updated',
            description: 'Your data has not been updated',
            icon: 'i-heroicons-x-circle',
            color: 'red',
        });
    }
}

async function handleSubmitPassword(event: FormSubmitEvent<ConfirmPasswordSchema>) {
    try {
        console.log(event.data);
        const res = await UsersManager.updateUserPassword(event.data);

        toast.add({
            title: 'Password updated',
            description: res?.message || 'Your password has been updated',
            icon: 'i-heroicons-check-circle',
            color: 'green',
        });
    } catch (error) {
        console.error(error);

        toast.add({
            title: 'Password not updated',
            description: 'Your password has not been updated',
            icon: 'i-heroicons-x-circle',
            color: 'red',
        });
    }
}
</script>
