import { nextTick } from 'vue';
import { defineStore } from 'pinia';
import { useFiltersStore } from './useFiltersStore';
import ProjectsManager from '~/services/ProjectsManager';
import type { Project, User } from '~/types/types';

export const useProjectsStore = defineStore('projects', {
    state: () => ({
        projects: [] as Project[],
        currentProjectId: null as string | null,
        isProjectsLoaded: false,
        currentProjectUsers: [] as User[],
    }),

    getters: {
        currentProject: state => state.projects.find(p => p._id === state.currentProjectId),
    },

    actions: {
        async fetchProjects() {
            this.isProjectsLoaded = false;
            await nextTick();
            this.projects = await ProjectsManager.getProjects();
            this.isProjectsLoaded = true;
        },

        changeCurrentProject(projectId: string) {
            if (this.currentProjectId !== projectId) {
                this.currentProjectId = projectId;

                const tasksStore = useTasksStore();
                const filtersStore = useFiltersStore();

                tasksStore.fetchTasks(projectId);

                this.fetchCurrentProjectUsers();
                filtersStore.resetFilters();
            }
        },

        async fetchCurrentProjectUsers() {
            if (!this.currentProjectId) return;

            try {
                this.currentProjectUsers = await ProjectsManager.getUsers(this.currentProjectId);
            } catch (error) {
                console.error(error);
            }
        },
    },
});
