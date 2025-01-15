interface Task {
  _id: number | string;
  title: string;
  description: string;
  completed: boolean;
  date: Date
}

export type { Task };
