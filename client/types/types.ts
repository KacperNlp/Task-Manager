type TaskStatus = "Done" | "InProgress" | "NotStarted";
type TaskType = "Low" | "Medium" | "Hight";
type Roles = "Project Manager" | "Backend Developer" | "Frontend Developer" | "Tester" | "Designer"

enum UserRoles {
  PM = 'Project Manager',
  BE = 'Backend Developer',
  FE = 'Frontend Developer',
  Tester = 'Tester',
  Designer = 'Designer',
}

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  date: Date,
  status: TaskStatus,
  taskType: TaskType
}

interface User {
  _id: string,
  email: string,
  name: string,
  surname: string,
  role: UserRoles
}

interface RegisterUser {
  name: string,
  surname: string,
  email: string,
  password: string,
  repeatPassword: string,
  role: UserRoles
}

interface Comment {
  _id:  string;
  taskId: string;
  user: User,
  text: string;
  date: Date;
}

interface Project {
  name: string,
  description: string
  users: string[]
}

interface StoreState {
  projects: Project[],
  tasks: Task[],
  loggedUser: User | null
}

export { UserRoles }
export type { Task, TaskStatus, Comment, User, RegisterUser, Project, StoreState, Roles };
