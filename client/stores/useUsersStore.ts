import { defineStore } from "pinia";
import UsersManager from "~/services/UsersManager";
import type { User } from "~/types/types";

export const useUsersStore = defineStore("users", {
  state: () => ({
    loggedUser: null as User | null,
  }),

  actions: {
    async fetchLoggedUser() {
      this.loggedUser = await UsersManager.getLoggedUser();
    },
  }
});