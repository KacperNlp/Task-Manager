const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const response = [
    { id: 1, title: "Task 1", description: "Description 1" },
    { id: 2, title: "Task 2", description: "Description 2" },
  ];

  res.send(response);
});

router.post("/add", (req, res) => {
  res.send("add comments");
});

module.exports = router;
