import { defineStore } from 'pinia';
import TasksManager from '~/services/TasksManager';
import { useSearchStore } from './useSearchStore';
import type { Task } from '~/types/types';

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: [] as Task[],
        tasksOfLoggedUser: [] as Task[],
        isTasksLoaded: false,
    }),

    getters: {
        doneTasks: state => {
            const searchStore = useSearchStore();
            const search = searchStore.getSearch;
            if (search) {
                return state.tasks.filter(
                    task =>
                        task.status === 'Done' &&
                        task.title.toLowerCase().includes(search.toLowerCase())
                );
            } else {
                return state.tasks.filter(task => task.status === 'Done');
            }
        },
        inProgressTasks: state => {
            const searchStore = useSearchStore();
            const search = searchStore.getSearch;
            if (search) {
                return state.tasks.filter(
                    task =>
                        task.status === 'InProgress' &&
                        task.title.toLowerCase().includes(search.toLowerCase())
                );
            } else {
                return state.tasks.filter(task => task.status === 'InProgress');
            }
        },
        notStartedTasks: state => {
            const searchStore = useSearchStore();
            const search = searchStore.getSearch;
            if (search) {
                return state.tasks.filter(
                    task =>
                        task.status === 'NotStarted' &&
                        task.title.toLowerCase().includes(search.toLowerCase())
                );
            } else {
                return state.tasks.filter(task => task.status === 'NotStarted');
            }
        },
        loggedUserTasks: state => state.tasksOfLoggedUser,
    },

    actions: {
        async fetchTasks(projectId: string) {
            this.isTasksLoaded = false;
            this.tasks = await TasksManager.getTasks(projectId);
            this.isTasksLoaded = true;
        },

        async fetchAllTasksOfLoggedUser(loggedUserId: string) {
            this.isTasksLoaded = false;
            this.tasksOfLoggedUser = await TasksManager.getTasksOfLoggedUser(loggedUserId);
            this.isTasksLoaded = true;
        },
    },
});
