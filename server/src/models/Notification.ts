import mongoose from "mongoose";
import NotificationSchema from "../schema/NotificationSchema";   

const Notification = mongoose.model("Notification", NotificationSchema);   

export default Notification;