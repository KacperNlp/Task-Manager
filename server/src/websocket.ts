import { WebSocketServer, WebSocket  } from "ws";

interface Message {
  _id: string;
  projectId: string;
  user: string;
  text: string;
  date: Date;
}

interface DataObject {
  type: string
  messages: Message[],
}

import Message from "./models/Messages";
import Project from "./models/Project";

const wss = new WebSocketServer({ port: 8081 });
const userConnections = new Map();
const projectSubscriptions = new Map();

export default function websocketSetup() {
    wss.on("connection", (ws: WebSocket) => {
        console.log("Client connected");
        ws.on("message", async (message: string) => {
          const messageObject = JSON.parse(message);
      
          if(messageObject.type === "join") {
            console.log("Client joined project", messageObject.projectId);

            userConnections.set(messageObject.userId, ws);

            if (!projectSubscriptions.has(messageObject.projectId)) {
              projectSubscriptions.set(messageObject.projectId, new Set());
            }
            projectSubscriptions.get(messageObject.projectId).add(messageObject.userId);
      
            const projectMessages = await Message.find({ projectId: messageObject.projectId }).populate("user", "name").sort({ date: 1 }).exec();
      
            ws.send(JSON.stringify({
              type: "messages",
              messages: projectMessages
            }));
          } else if(messageObject.type === "message") {
            await Message.create({ projectId: messageObject.projectId, user: messageObject.author, text: messageObject.message });

            const projectMessages = await Message.find({ projectId: messageObject.projectId }).populate("user", "name").sort({ date: 1 }).exec();

            notifyProjectUsers(messageObject.projectId, {
              type: "messages",
              messages: projectMessages,
            });
          }
        });
        
        ws.on("close", () => {
          console.log("Client disconnected");
        });
    });
}

const notifyProjectUsers = async (projectId: string, data: DataObject) => {
  const project = await Project.findById(projectId).populate("users");

  if (!project) return;

  project.users.forEach((user) => {
    const userSocket = userConnections.get(user._id.toString());
    if (userSocket && userSocket.readyState === WebSocket.OPEN) {
      userSocket.send(JSON.stringify(data));
    }
  });
};

export { userConnections, projectSubscriptions };