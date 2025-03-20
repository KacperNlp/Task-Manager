import { WebSocketServer, WebSocket  } from "ws";

import Message from "./models/Messages";

const wss = new WebSocketServer({ port: 8081 });

export default function websocketSetup() {
    wss.on("connection", (ws: WebSocket) => {
        console.log("Client connected");
        ws.on("message", async (message: string) => {
          const messageObject = JSON.parse(message);
      
          if(messageObject.type === "join") {
            console.log("Client joined project", messageObject.projectId);
      
            const projectMessages = await Message.find({ projectId: messageObject.projectId }).populate("user", "name").sort({ date: 1 }).exec();
      
            ws.send(JSON.stringify({
              type: "messages",
              messages: projectMessages
            }));
          } else if(messageObject.type === "message") {
            await Message.create({ projectId: messageObject.projectId, user: messageObject.author, text: messageObject.message });

            const projectMessages = await Message.find({ projectId: messageObject.projectId }).populate("user", "name").sort({ date: 1 }).exec();

            wss.clients.forEach(client => {
              if(client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                  type: "messages",
                  messages: projectMessages
                }));
              }
            });
          }
        });
        
        ws.on("close", () => {
          console.log("Client disconnected");
        });
    });
}