import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
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

io.on("connection", (socket) => {
  console.log("Użytkownik połączony:", socket.id);

  socket.on("joinProject", (projectId) => {
    socket.join(projectId);
  });

  socket.on("newTask", (data) => {
    io.to(data.projectId).emit("taskAssigned", data);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.projectId).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("Użytkownik odłączony:", socket.id);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
