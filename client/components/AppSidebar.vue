<template>
  <section
    class="fixed bg-zinc-900 h-screen z-10 border-r border-r-zinc-600 z-1 duration-300"
    :class="{
      '-translate-x-[270px]': isSidebarActive,
    }"
  >
    <div class="flex items-center gap-2 h-[88px] px-5 py-6">
      <img src="/project-logo.svg" alt="Task Manager" />
      <h2 class="text-xl font-semibold mr-10">Project M.</h2>
      <button
        @click="toggleSidebar"
        aria-label="Change sidebar visbility"
        class="flex items-center"
        :class="{ 'translate-x-[100px]': isSidebarActive }"
      >
        <Icon
          v-show="isSidebarActive"
          name="mingcute:arrows-right-line"
          class="bg-gray-400 text-2xl"
        />
        <Icon
          v-show="!isSidebarActive"
          name="mingcute:arrows-left-line"
          class="bg-gray-400 text-2xl"
        />
      </button>
    </div>
    <nav class="px-5">
      <ul class="flex flex-col gap-6 border-b border-b-zinc-600 py-6">
        <li v-for="link in links">
          <a
            href="#"
            class="group flex items-center gap-4 hover:text-emerald-500"
          >
            <Icon
              :name="link.icon"
              class="bg-gray-400 text-2xl group-hover:bg-emerald-500"
            />
            <span>{{ link.text }}</span>
          </a>
        </li>
      </ul>
      <div class="flex justify-between mt-6 mb-5">
        <h3 class="text-gray-400 font-semibold uppercase text-xs pl-2">
          My projects
        </h3>
        <button
          @click="handleToggleAddNewProjectForm"
          class="group flex items-center justify-center border border-gray-400 hover:border-emerald-500 hover:bg-emerald-500 rounded-md w-4 h-4group duration-200"
        >
          <Icon
            name="cuida:plus-outline"
            class="bg-gray-400 text-xs group-hover:bg-white"
          />
        </button>
      </div>
      <ul class="flex flex-col gap-2">
        <li v-for="project in store.projects">
          <NuxtLink
            @click="handleClickChangeProject(project._id)"
            :to="`/?project=${project._id}`"
            class="group flex items-center gap-2 p-2 rounded-md text-gray-400 hover:text-gray-100 hover:bg-zinc-950 cursor-pointer hover:font-semibold duration-200"
            :class="{
              'bg-zinc-950 font-semibold text-gray-100': isSelectedProject(
                project._id
              ),
            }"
          >
            <span
              class="block w-2 h-2 rounded-full"
              :style="`background-color: ${project.color}`"
            ></span>
            <span>{{ project.name }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </section>
  <UModal v-model="formIsActive">
    <AppAddProjectForm @closeForm="handleToggleAddNewProjectForm" />
  </UModal>
</template>
<script setup lang="ts">
const store = useWebsiteStore();
const isSidebarActive = ref(false);
const formIsActive = ref(false);

const links = [
  {
    text: "Home",
    icon: "clarity:blocks-group-solid",
  },
  {
    text: "Messages",
    icon: "hugeicons:message-02",
  },
  {
    text: "Tasks",
    icon: "fluent:task-list-rtl-24-regular",
  },
  {
    text: "Members",
    icon: "mynaui:users-group",
  },
  {
    text: "Settings",
    icon: "lsicon:setting-outline",
  },
];

function isSelectedProject(projectId: string) {
  return projectId === store.currentProjectId;
}

function toggleSidebar() {
  isSidebarActive.value = !isSidebarActive.value;
}

function handleToggleAddNewProjectForm() {
  formIsActive.value = !formIsActive.value;
}

function handleClickChangeProject(projectId: string) {
  store.changeCurrentProject(projectId);
}
</script>
