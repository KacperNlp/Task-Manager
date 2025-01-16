type TaskStatus = "Done" | "InProgress" | "NotStarted";

interface Task {
  _id: number | string;
  title: string;
  description: string;
  completed: boolean;
  date: Date,
  status: TaskStatus
}

export type { Task, TaskStatus };
