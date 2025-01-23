import ProjectsManager from '~/services/ProjectsManager'
import type { StoreState } from '../types/types'

export const useWebsiteStore = defineStore('websiteStore', {
    state: (): StoreState => ({
        projects: [],
        tasks: []
    }),

    getters: {
    },

    actions: {
        async fetchProjectsList() {
            const res = await ProjectsManager.getProjects();
            this.projects = res;
        }
    }
})