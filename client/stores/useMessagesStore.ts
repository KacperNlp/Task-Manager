import type { Message } from "~/types/types";

export const useMessagesStore = defineStore("messages", {
    state: () => ({
        messages: [] as Message[],
    }),

    getters: {
        getMessages: (state) => state.messages,
    },

    actions: {
        addMessage(message: Message) {
            this.messages.push(message);
        },

        setMessages(messages: Message[]) {
            this.messages = messages;
        },
    },
});