<template>
    <section class="relative w-full max-w-md md:ml-auto">
        <UForm
            :state="searchStore.search"
            class="space-y-4 w-full max-w-[650px] md:min-w-96"
            @submit="searchValue"
        >
            <UInput
                v-model="searchStore.search.value"
                icon="i-heroicons-magnifying-glass-20-solid"
                size="md"
                color="white"
                :trailing="false"
                placeholder="Search..."
            />
        </UForm>
    </section>
</template>

<script lang="ts" setup>
const searchStore = useSearchStore();

function searchValue() {
    console.log(searchStore.getSearch);
}
</script>
