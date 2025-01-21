type TaskStatus = "Done" | "InProgress" | "NotStarted";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  date: Date,
  status: TaskStatus
}

interface User {
  _id: string,
  email: string,
}

interface Comment {
  _id:  string;
  taskId: string;
  user: User,
  text: string;
  date: Date;
}

export type { Task, TaskStatus, Comment, User };
