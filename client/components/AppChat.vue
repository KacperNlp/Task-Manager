<template>
  <button
    @click="handleToggleChat"
    class="fixed bottom-12 right-8 z-50 w-12 h-12 rounded-full bg-primary-500 flex justify-center items-center shadow-lg text-lg hover:bg-primary-600 duration-200"
  >
    <Icon name="et:chat" />
  </button>

  <div
    class="fixed bottom-12 z-50 duration-300"
    :class="{ 'right-[-400px]': !isChatOpen, 'right-8': isChatOpen }"
  >
    <div
      class="w-[400px] min-h-[600px] bg-zinc-900 p-4 shadow-lg relative border-primary-800 border"
    >
      <div class="flex justify-between items-center border-b pb-2">
        <h2 class="font-title text-lg">Chat</h2>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          @click="handleToggleChat"
        />
      </div>
      <div class="flex flex-col mt-4 space-y-2 flex-grow overflow-y-auto">
        <div
          class="self-start bg-primary-200 text-neutral-950 p-2 rounded-md max-w-xs"
        >
          Hi! How can I help you today?
        </div>
        <div
          class="self-end bg-primary-500 text-primary-50 p-2 rounded-md max-w-xs"
        >
          I need some help with my order.
        </div>
        <div
          class="self-start bg-primary-200 text-neutral-950 p-2 rounded-md max-w-xs"
        >
          Sure. Please, provide your order number.
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 p-4 bg-zinc-800">
        <div class="flex items-center space-x-2">
          <input
            type="text"
            class="w-full bg-white border border-neutral-300 rounded-md p-2 text-neutral-950 text-sm"
            placeholder="Type a message..."
          />
          <UButton
            color="gray"
            variant="ghost"
            icon="material-symbols:send"
            class="-my-1"
            @click="handleToggleChat"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isChatOpen = ref(false);

function handleToggleChat() {
  isChatOpen.value = !isChatOpen.value;
}
</script>
