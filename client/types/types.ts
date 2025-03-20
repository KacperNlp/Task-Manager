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
  taskType: TaskType,
  numberOfComments?: number
}

interface NewTask {
  title: string,
  description: string,
  date: string,
  taskType: TaskType,
  projectId: string | null,
  userId: string,
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
  _id: string,
  name: string,
  description: string
  color: string
  users: string[]
}

interface NewProject {
  name: string,
  description: string
  color: string
  users: string[]
}

interface MessageToSend {
  user: User,
  text: string,
  date: Date
}

interface Message extends MessageToSend {
  _id: string,
}

export { UserRoles, TaskStatus, TaskType }
export type { Task, NewTask, Comment, User, RegisterUser, Project, NewProject, Roles, Message, MessageToSend };
