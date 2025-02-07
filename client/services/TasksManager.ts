import type { NewTask, Task } from "../types/types";

export default abstract class TasksManager {
    static async getTasks(currentProjectId: string) {
        const config = useRuntimeConfig();

        const tasks = await $fetch<Task[]>(`${config.public.apiURL}/tasks?projectId=${currentProjectId}`, {
            method: "GET",
            credentials: "include"
          });

        return tasks;
    }

    static async createNewTask(newTask: NewTask) {
        const config = useRuntimeConfig();

        const tasks = await $fetch<Task[]>(`${config.public.apiURL}/tasks/add`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(newTask)
          });

        return tasks;
    }
}