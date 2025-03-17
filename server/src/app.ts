import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import http from "http";
import { WebSocketServer  } from "ws";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);

const wss = new WebSocketServer({ port: 8081 });

wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected");
  ws.on("message", (message: string) => {
    console.log("Received message:", message);
  });
  
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

import comments from "./routes/comments";
import projects from "./routes/projects";
import tasks from "./routes/tasks";
import users from "./routes/users";

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err: Error) => console.error("❌ MongoDB Connection Error:", err));

//routes
app.use("/comments", comments);
app.use("/projects", projects);
app.use("/tasks", tasks);
app.use("/", users);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
