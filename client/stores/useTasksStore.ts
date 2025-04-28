import { defineStore } from 'pinia';
import TasksManager from '~/services/TasksManager';
import { useSearchStore } from './useSearchStore';
import { useFiltersStore } from './useFiltersStore';
import type { Task } from '~/types/types';

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: [] as Task[],
        tasksOfLoggedUser: [] as Task[],
        isTasksLoaded: false,
    }),

    getters: {
        doneTasks: state => {
            let tasks = state.tasks.filter(task => task.status === 'Done');

            const store = useTasksStore();
            return store.filterTasks(tasks);
        },
        inProgressTasks: state => {
            let tasks = state.tasks.filter(task => task.status === 'InProgress');

            const store = useTasksStore();
            return store.filterTasks(tasks);
        },
        notStartedTasks: state => {
            let tasks = state.tasks.filter(task => task.status === 'NotStarted');

            const store = useTasksStore();
            return store.filterTasks(tasks);
        },
        loggedUserTasks: state => {
            const searchStore = useSearchStore();
            const search = searchStore.getSearch;

            if (search) {
                return state.tasksOfLoggedUser.filter(task =>
                    task.title.toLowerCase().includes(search.toLowerCase())
                );
            } else {
                return state.tasksOfLoggedUser;
            }
        },
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

        filterTasks(tasks: Task[]) {
            const searchStore = useSearchStore();
            const filtersStore = useFiltersStore();
            const search = searchStore.getSearch;

            if (filtersStore.filters.taskType === 'Medium') {
                tasks = tasks.filter(task => task.taskType === 'Medium');
            } else if (filtersStore.filters.taskType === 'Hight') {
                tasks = tasks.filter(task => task.taskType === 'Hight');
            } else if (filtersStore.filters.taskType === 'Low') {
                tasks = tasks.filter(task => task.taskType === 'Low');
            }

            if (filtersStore.filters.assignedTo.value !== 'All') {
                tasks = tasks.filter(
                    task => task.user_id._id === filtersStore.filters.assignedTo.value
                );
            }

            if (search) {
                return tasks.filter(task =>
                    task.title.toLowerCase().includes(search.toLowerCase())
                );
            }

            return tasks;
        },
    },
});
