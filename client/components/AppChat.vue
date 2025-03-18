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
        v-if="messages.length"
        ref="chatConteiner"
        class="flex flex-col mt-4 space-y-2 flex-grow overflow-y-auto pb-4"
      >
        <AppChatMessages
          v-for="message in messages"
          :message="message.text"
          :user="message.user.name"
          :user-id="message.user._id"
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
import type { Message } from "~/types/types";

const projectsStore = useProjectsStore();
const usersStore = useUsersStore();

const isChatOpen = ref(false);
const message = ref("");
const chatContainer = ref<HTMLDivElement | null>(null);

const ws = ref<WebSocket | null>(null);

const messages = reactive<Message[] | []>([]);

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
    if (usersStore.loggedUser === null) return;

    ws.value?.send(
      JSON.stringify({
        type: "message",
        projectId: projectsStore.currentProjectId,
        author: usersStore.loggedUser._id,
        message: message.value,
      })
    );
    scrollToBottom();
  } catch (err) {
    console.error(err);
  }
}

onMounted(() => {
  scrollToBottom();
  ws.value = new WebSocket("ws://localhost:8081");

  ws.value.onopen = () => {
    ws.value?.send(
      JSON.stringify({
        type: "join",
        projectId: projectsStore.currentProjectId,
      })
    );
  };

  ws.value.onmessage = (event) => {
    const res = JSON.parse(event.data);
    console.log(res);

    if (res.type === "message") {
      messages.push({
        user: res.user,
        text: res.text,
        date: res.date,
      });

      scrollToBottom();
    } else if (res.type === "messages") {
      messages.length = 0;

      res.messages.forEach((message: any) => {
        messages.push({
          user: message.user,
          text: message.text,
          date: message.date,
        });
      });

      scrollToBottom();
    }
  };

  ws.value.onclose = () => {
    console.log("Disconnected from server");
  };
});

onBeforeUnmount(() => {
  ws.value?.close();
});
</script>
