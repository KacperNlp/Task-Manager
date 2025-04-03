import type { User, UpdateUser, UpdateUserPassword, ResponseMessage } from "../types/types";

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

    static async updateUser(user: UpdateUser) {
        const config = useRuntimeConfig();

        const res = await $fetch<ResponseMessage>(`${config.public.apiURL}/users/logged/update`, {
            method: "PUT",
            credentials: "include",
            body: user,
        });

        return res;
    }

    static async updateUserPassword(user: UpdateUserPassword) {
        const config = useRuntimeConfig();

        const res = await $fetch<ResponseMessage>(`${config.public.apiURL}/users/logged/update/password`, {
            method: "PUT",
            credentials: "include",
            body: user,
        });

        return res;
    }
}