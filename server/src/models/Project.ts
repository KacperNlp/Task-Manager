import mongoose from "mongoose";
import ProjectSchema from "../schema/ProjectSchema";

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
