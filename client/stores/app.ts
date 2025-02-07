import ProjectsManager from '~/services/ProjectsManager'
import TasksManager from '~/services/TasksManager'
import UsersManager from '~/services/UsersManager'
import type { StoreState } from '../types/types'

export const useWebsiteStore = defineStore('websiteStore', {
    state: (): StoreState => ({
        projects: [],
        tasks: [],
        loggedUser: null,
        currentProjectId: null
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
        },

        getuCurrentProject: ({ projects, currentProjectId }) => {
            return projects.find(project => project._id === currentProjectId);
        }
    },

    actions: {
        async fetchProjectsList() {
            const res = await ProjectsManager.getProjects();
            console.log(res);
            this.projects = res;
        },

        async fetchTasks() {
            if(!this.currentProjectId) return;

            const tasks = await TasksManager.getTasks(this.currentProjectId);
            this.tasks = tasks;
        },

        async fetchLoggedUserData() {
            const res = await UsersManager.getLoggedUser();
            this.loggedUser = res;
        },

        async changeCurrentProject(projetId: string) {
            if(projetId === this.currentProjectId) return;

            this.currentProjectId = projetId
            await this.fetchTasks();
        },

        setProject(projectId: string | undefined | null) {
            if(projectId) this.currentProjectId = projectId;

            this.currentProjectId = this.projects[0]._id;
        }
    }
})