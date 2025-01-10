<template>
    <div class="flex flex-col gap-2 mb-2">
        <label :for="inputId" class="text-xs text-gray-500">{{ label }}</label>
        <input :type="type" :id="inputId" :name="inputId"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" required
            class="p-2 border border-gray-300 rounded-md" />
    </div>
</template>
<script setup lang="ts">
interface AppInputProps {
    label: string;
    type: string;
    inputId: string;
    name: string;
    required: boolean;
    modelValue: string;
}

withDefaults(defineProps<AppInputProps>(), {
    required: false,
    type: "text",
});
defineEmits(["update:modelValue"]);
</script>