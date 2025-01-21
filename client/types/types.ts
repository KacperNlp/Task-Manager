type TaskStatus = "Done" | "InProgress" | "NotStarted";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  date: Date,
  status: TaskStatus
}

interface Comment {
  _id:  string;
  taskId: string;
  userId: string,
  text: string;
  date: Date;
}

export type { Task, TaskStatus, Comment };
