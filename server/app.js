const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const comments = require("./routes/comments");
const projects = require("./routes/projects");
const tasks = require("./routes/tasks");
const users = require("./routes/users");

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
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

//routes
app.use("/comments", comments);
app.use("/projects", projects);
app.use("/tasks", tasks);
app.use("/", users);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
