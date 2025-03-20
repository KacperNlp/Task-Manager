import type { Notification } from "~/types/types";

export const useNotificationsStore = defineStore("notifications", {
    state: () => ({
        notifications: [] as Notification[],
    }),
    actions: {
        addNotification(notification: Notification) {
            this.notifications.push(notification);
        },
    },
});