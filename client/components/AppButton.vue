<template>
    <button class="py-2 px-4  text-gray-50 rounded-md duration-200" type="button"
    :class="{
        'bg-lime-600 hover:bg-lime-700': btnType === 'primary',
        'bg-red-600 hover:bg-red-700': btnType === 'danger'
    }">
        <slot />
    </button>
</template>
<script setup lang="ts">
interface AppButtonProps {
    btnType: 'primary' | 'danger';
}

withDefaults(defineProps<AppButtonProps>(), {
    btnType: 'primary', 
});
</script>