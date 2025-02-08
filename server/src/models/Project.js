const mongoose = require("mongoose");
const ProjectSchema = require("../schema/ProjectSchema");

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
