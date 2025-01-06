const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

const tasks = require("./routes/tasks");

app.use(cors());

//routes
app.use("/tasks", tasks);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
