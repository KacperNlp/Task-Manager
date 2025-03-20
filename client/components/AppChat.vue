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
      class="flex flex-col w-[400px] h-[600px] bg-zinc-900 p-4 shadow-lg relative border-primary-800 border"
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
      <div
        v-if="messagesStore.getMessages.length"
        ref="chatConteiner"
        class="flex flex-col mt-4 space-y-2 flex-grow overflow-y-auto pb-4"
      >
        <AppChatMessages
          v-for="message in messagesStore.getMessages"
          :message="message.text"
          :user="message.user.name"
          :user-id="message.user._id"
          :key="message._id"
        />
      </div>
      <div class="mt-auto p-4 mr-[-16px] mb-[-16px] ml-[-16px] bg-zinc-800">
        <div class="flex items-center space-x-2">
          <input
            v-model="message"
            type="text"
            class="w-full bg-white border border-neutral-300 rounded-md p-2 text-neutral-950 text-sm"
            placeholder="Type a message..."
          />
          <UButton
            color="gray"
            variant="ghost"
            icon="material-symbols:send"
            class="-my-1"
            @click="handleSendMessage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $websocket } = useNuxtApp();

const messagesStore = useMessagesStore();

const message = ref("");
const isChatOpen = ref(false);
const chatContainer = ref<HTMLDivElement | null>(null);

function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
}

function handleToggleChat() {
  isChatOpen.value = !isChatOpen.value;
}

async function handleSendMessage() {
  try {
    $websocket.sendMessage(message.value);

    message.value = "";
    scrollToBottom();
  } catch (err) {
    console.error(err);
  }
}
</script>
