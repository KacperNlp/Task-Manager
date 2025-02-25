import { defineStore } from "pinia";
import TasksManager from "~/services/TasksManager";
import type { Task } from "~/types/types";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [] as Task[],
  }),

  getters: {
    doneTasks: (state) => state.tasks.filter(task => task.status === "Done"),
    inProgressTasks: (state) => state.tasks.filter(task => task.status === "InProgress"),
    notStartedTasks: (state) => state.tasks.filter(task => task.status === "NotStarted"),
  },

  actions: {
    async fetchTasks(projectId: string) {
      this.tasks = await TasksManager.getTasks(projectId);
    },
  }
});