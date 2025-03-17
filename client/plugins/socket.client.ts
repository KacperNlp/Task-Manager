import { io } from "socket.io-client";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const socket = io(config.public.apiURL);

    socket.on('connect', () => {
        console.log('connect');
    })

    socket.on('disconnect', () => {
        console.log('disconnect')
    })

    return {
        provide: {
        socket,
        },
    };
});