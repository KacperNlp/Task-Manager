type TaskStatus = "Done" | "InProgress" | "NotStarted";

interface Task {
  _id: number | string;
  title: string;
  description: string;
  completed: boolean;
  date: Date,
  status: TaskStatus
}

interface Comment {
  _id: number | string;
  taskId: number | string;
  text: string;
  date: Date;
  author: string;
}

export type { Task, TaskStatus, Comment };
