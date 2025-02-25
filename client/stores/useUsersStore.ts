import { defineStore } from "pinia";
import UsersManager from "~/services/UsersManager";
import type { User } from "~/types/types";

export const useUsersStore = defineStore("users", {
  state: () => ({
    loggedUser: null as User | null,
    isLoggedUserLoaded: false
  }),

  actions: {
    async fetchLoggedUser() {
      this.isLoggedUserLoaded = false;
      this.loggedUser = await UsersManager.getLoggedUser();
      this.isLoggedUserLoaded = true;
    },
  }
});