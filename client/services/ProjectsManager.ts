import type { Project, NewProject, User } from '../types/types';

export default abstract class ProjectsManager {
    static async getProjects() {
        const config = useRuntimeConfig();

        const res = await $fetch<Project[]>(`${config.public.apiURL}/projects`, {
            method: 'GET',
            credentials: 'include',
        });

        return res;
    }

    static async createProject(data: NewProject) {
        const config = useRuntimeConfig();
        const store = useProjectsStore();

        await $fetch(`${config.public.apiURL}/projects`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(data),
        });

        store.fetchProjects();
    }

    static async addUserToProject(projectId: string, userId: string) {
        const config = useRuntimeConfig();

        await $fetch(`${config.public.apiURL}/projects/${projectId}/users`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify({ userId }),
        });
    }

    static async getUsers(projectId: string) {
        const config = useRuntimeConfig();

        const res = await $fetch<User[]>(`${config.public.apiURL}/projects/${projectId}/users`, {
            method: 'GET',
            credentials: 'include',
        });

        return res;
    }
}
