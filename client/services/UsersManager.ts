import type { User } from "../types/types";

export default abstract class UserManager {
    static async getUsers(projectId: string | null = null) {
        const config = useRuntimeConfig();

        const res = await $fetch<User[]>(`${config.public.apiURL}/users/all/${projectId}`, {
            method: "GET",
            credentials: "include",
        });

        return res;
    }

    static async getLoggedUser() {
        const config = useRuntimeConfig();

        const res = await $fetch<User>(`${config.public.apiURL}/users/logged`, {
            method: "GET",
            credentials: "include",
        });

        return res;
    }

    static async updateUser(user: User) {
        const config = useRuntimeConfig();

        const res = await $fetch<User>(`${config.public.apiURL}/users/update`, {
            method: "PUT",
        });
    }
}