import type { Project, NewProject } from "../types/types";

export default abstract class ProjectsManager {
    static async getProjects() {
        const config = useRuntimeConfig();

        const res = await $fetch<Project[]>(`${config.public.apiURL}/projects`, {
            method: "GET",
            credentials: "include",
        });

        return res;
    }

    static async createProject(data: NewProject) {
        const config = useRuntimeConfig();
        const store = useWebsiteStore();

        await $fetch(`${config.public.apiURL}/projects`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(data),
        });

        store.fetchProjectsList();
    }
}