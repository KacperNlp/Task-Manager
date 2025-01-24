import type { Task } from "../types/types";

export default abstract class TasksManager {
    static async getTasks() {
        const config = useRuntimeConfig();

        const { todayTasks, oldTasks } = await $fetch<{ todayTasks: Task[], oldTasks: Task[] }>(`${config.public.apiURL}/tasks`, {
            method: "GET",
            credentials: "include",
          });

        return { todayTasks, oldTasks };
    }
}