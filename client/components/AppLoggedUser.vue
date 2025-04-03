<template>
  <div>
    <UDropdown
      :items="items"
      :ui="{ item: { disabled: 'cursor-text select-text' } }"
      :popper="{ placement: 'bottom-start' }"
    >
      <div class="flex gap-3 items-center">
        <div class="hidden md:flex flex-col items-end text-sm">
          <strong v-if="store.isLoggedUserLoaded">{{
            loggedUserNameAndSurname
          }}</strong>
          <div v-else class="mb-1">
            <AppTextPlaceholder size="sm" />
          </div>
          <span v-if="store.isLoggedUserLoaded" class="text-gray-400 text-xs">{{
            loggedUserRole
          }}</span>
          <div v-else>
            <AppTextPlaceholder size="sm" />
          </div>
        </div>
        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />
      </div>

      <template #account="{ item }">
        <div class="text-left">
          <p>Signed in as</p>
          <p class="truncate font-medium text-gray-900 dark:text-white">
            {{ item.label }}
          </p>
        </div>
      </template>

      <template #item="{ item }">
        <div
          @click="item.onClick"
          class="cursor-pointer flex items-center justify-between w-full"
        >
          <span class="truncate">{{ item.label }}</span>

          <UIcon
            :name="item.icon"
            class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
          />
        </div>
      </template>
    </UDropdown>
  </div>
</template>

<script setup lang="ts">
const { logout } = useAuth();

const router = useRouter();
const store = useUsersStore();

const loggedUserNameAndSurname = computed(
  () => `${store.loggedUser?.name} ${store.loggedUser?.surname}`
);

const loggedUserRole = computed(() => store.loggedUser?.role);

const items = [
  [
    {
      label: "ben@example.com",
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
      onClick: () => router.push("/settings"),
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
    },
  ],
];

async function logoutUser() {
  try {
    await logout();
    router.push("/login");
  } catch (error) {
    console.error(error);
  }
}
</script>
