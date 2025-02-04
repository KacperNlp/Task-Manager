import type { Task } from "../types/types";

export default abstract class TasksManager {
    static async getTasks() {
        const config = useRuntimeConfig();

        const tasks = await $fetch<Task[]>(`${config.public.apiURL}/tasks`, {
            method: "GET",
            credentials: "include",
          });

        return tasks;
    }
}