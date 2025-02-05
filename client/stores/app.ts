import ProjectsManager from '~/services/ProjectsManager'
import TasksManager from '~/services/TasksManager'
import UsersManager from '~/services/UsersManager'
import type { StoreState } from '../types/types'

export const useWebsiteStore = defineStore('websiteStore', {
    state: (): StoreState => ({
        projects: [],
        tasks: [],
        loggedUser: null
    }),

    getters: {
        getDoneTasks: ({ tasks }) => {
            const tasksDone = tasks.filter((task) => task.status === "Done");
          
            return tasksDone;
        },

        getTasksInProgress: ({ tasks }) => {
            const tasksDone = tasks.filter((task) => task.status === "InProgress");
          
            return tasksDone;
        },

        getNotStartedTasks: ({ tasks }) => {
            return tasks.filter((task) => task.status === "NotStarted")
        }
    },

    actions: {
        async fetchProjectsList() {
            const res = await ProjectsManager.getProjects();
            this.projects = res;
        },

        async fetchTasks() {
            const tasks = await TasksManager.getTasks();
            this.tasks = tasks;
        },

        async fetchLoggedUserData() {
            const res = await UsersManager.getLoggedUser();
            this.loggedUser = res;
        }
    }
})