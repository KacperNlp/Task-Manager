import { nextTick } from 'vue';
import { defineStore } from "pinia";
import ProjectsManager from "~/services/ProjectsManager";
import type { Project } from "~/types/types";

export const useProjectsStore = defineStore("projects", {
  state: () => ({
    projects: [] as Project[],
    currentProjectId: null as string | null,
    isProjectsLoaded: false,
  }),

  getters: {
    currentProject: (state) => state.projects.find(p => p._id === state.currentProjectId),
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
      }
    }
  }
});