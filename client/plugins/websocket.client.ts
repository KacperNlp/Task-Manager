export default defineNuxtPlugin((nuxtApp) => {
    const projectsStore = useProjectsStore();
    const usersStore = useUsersStore();
    const messagesStore = useMessagesStore();

    let ws: WebSocket | null = null;

    const connect = (projectId: string) => {      
        ws?.close();
        ws = new WebSocket(`ws://localhost:8081/`); 

        ws.onopen = () => {
            ws?.send(JSON.stringify({ type: "join", projectId: projectId }));
        };

        ws.onmessage = (event) => {
            const res = JSON.parse(event.data);

            if(res.type === "message") {
                messagesStore.addMessage(res);
            } else if(res.type === "messages") {
                messagesStore.setMessages(res.messages);
            }
            
        }

        ws.onclose = () => console.log("WebSocket closed");
        ws.onerror = (error) => console.error("WebSocket error:", error);
    }


    const sendMessage = (message: string) => {
        if(usersStore.loggedUser === null) return;

        ws?.send(JSON.stringify({
            type: "message",
            projectId: projectsStore.currentProjectId,
            author: usersStore.loggedUser._id,
            message: message,
        }));
    }

    return { provide: { websocket: { connect, sendMessage }} };
});