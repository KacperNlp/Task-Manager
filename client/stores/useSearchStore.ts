export const useSearchStore = defineStore('search', {
    state: () => ({
        search: {
            value: '',
        },
    }),

    getters: {
        getSearch: state => state.search.value,
    },

    actions: {
        setSearch(search: string) {
            this.search.value = search;
        },

        clearSearch() {
            this.search.value = '';
        },
    },
});
