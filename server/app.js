const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const tasks = require("./routes/tasks");
const users = require("./routes/users");  

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

//routes
app.use("/tasks", tasks);
app.use("/", users);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
