import { io } from "socket.io-client";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const socket = io(config.public.apiURL);

    return {
        provide: {
        socket,
        },
    };
});