import type { User } from "../types/types";

export default abstract class UserManager {
    static async getUsers() {
        const config = useRuntimeConfig();

        const res = await $fetch<User[]>(`${config.public.apiURL}/users/all`, {
            method: "GET",
            credentials: "include",
        });

        return res;
    }
}