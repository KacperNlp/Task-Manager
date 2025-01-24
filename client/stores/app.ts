import ProjectsManager from '~/services/ProjectsManager'
import TasksManager from '~/services/TasksManager'
import type { StoreState } from '../types/types'

export const useWebsiteStore = defineStore('websiteStore', {
    state: (): StoreState => ({
        projects: [],
        tasks: [],
        oldTasks: []
    }),

    getters: {
        getDoneTasks: ({ tasks, oldTasks }) => {
            const tasksDone = tasks.filter((task) => task.status === "Done");
            const oldTasksDone = oldTasks.filter((task) => task.status === "Done");
          
            return [...tasksDone, ...oldTasksDone];
        },

        getTasksInProgress: ({ tasks, oldTasks }) => {
            const tasksDone = tasks.filter((task) => task.status === "InProgress");
            const oldTasksDone = oldTasks.filter((task) => task.status === "InProgress");
          
            return [...tasksDone, ...oldTasksDone];
        },

        getNotStartedTasks: ({ tasks }) => {
            return tasks.filter((task) => task.status === "NotStarted")
        },

        getNotStartedOldTasks: ({ oldTasks }) => {
            return oldTasks.filter((task) => task.status === "NotStarted")
        }
    },

    actions: {
        async fetchProjectsList() {
            const res = await ProjectsManager.getProjects();
            this.projects = res;
        },

        async fetchTasks() {
            const { todayTasks, oldTasks } = await TasksManager.getTasks();

            this.tasks = todayTasks;
            this.oldTasks = oldTasks;
        }
    }
})