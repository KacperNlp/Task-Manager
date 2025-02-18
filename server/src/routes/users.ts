import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Project from "../models/Project";
import { handleError } from "../utils/errorHandler";
import type { Request, Response } from "express";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, name, surname, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      name,
      surname,
      password: hashedPassword,
      role,
    });
    user.save();

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    res.cookie("user_id", user._id, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return res.status(200).json({ success: true, message: "User registered" });
  } catch (err) {
    return handleError(res, err);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    res.cookie("user_id", user._id, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return res.status(200).json({ success: true, message: "User logged in" });
  } catch (err) {
    return handleError(res, err);
  }
});

router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("token");
  res.clearCookie("user_id");
  res.json({ message: "User logged out successfully" });
});

router.get("/users/all/:projectId", async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    let users;

    if(projectId !== 'null') {
      const project = await Project.findById(projectId).populate("users", "name surname role _id");

      if(!project)
          return res.status(404).json({ message: 'Project not found!' });

      users = project.users;
    } else {
      users = await User.find().select("name surname role _id");
    }

    res.status(200).json(users);
  } catch (err) {
    return handleError(res, err);
  }
});

router.get("/users/logged", async (req: Request, res: Response) => {
  try {
    const loggedUser = await User.findById(req.cookies.user_id);

    res.status(200).json(loggedUser);
  } catch (err) {
    return handleError(res, err);
  }
});

module.exports = router;
