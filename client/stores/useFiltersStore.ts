const defaultAssignedTo = {
    name: 'All',
    value: 'All',
};

export const useFiltersStore = defineStore('filters', {
    state: () => ({
        filters: {
            taskType: 'All',
            assignedTo: defaultAssignedTo,
        },
    }),

    getters: {
        getDefaultAssignedTo: () => defaultAssignedTo,
    },

    actions: {
        resetFilters() {
            this.filters.taskType = 'All';
            this.filters.assignedTo = defaultAssignedTo;
        },
    },
});
