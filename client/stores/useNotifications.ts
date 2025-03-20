export const useNotifications = defineStore("notifications", {
    state: () => ({
        notifications: [] as string[],
    }),
    actions: {
        addNotification(notification: string) {
            this.notifications.push(notification);
        },
    },
});