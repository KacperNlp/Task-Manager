<template>
  <section class="fixed bg-white h-screen z-10 border-r">
    <div class="flex items-center gap-2 h-[88px] border-b px-5 py-6">
      <img src="/project-logo.svg" alt="Task Manager" />
      <h2 class="text-xl font-semibold mr-10">Project M.</h2>
      <button
        @click="toggleSidebar"
        aria-label="Change sidebar visbility"
        class="flex items-center"
      >
        <Icon
          v-show="isSidebarActive"
          name="mingcute:arrows-right-line"
          class="bg-gray-500 text-2xl"
        />
        <Icon
          v-show="!isSidebarActive"
          name="mingcute:arrows-left-line"
          class="bg-gray-500 text-2xl"
        />
      </button>
    </div>
    <nav class="px-5">
      <ul class="flex flex-col gap-6 border-b py-6">
        <li v-for="link in links">
          <a
            href="#"
            class="group flex items-center gap-4 text-gray-500 hover:text-blue-500"
          >
            <Icon
              :name="link.icon"
              class="bg-gray-500 text-2xl group-hover:bg-blue-500"
            />
            <span>{{ link.text }}</span>
          </a>
        </li>
      </ul>
      <div class="flex justify-between mt-6 mb-5">
        <h3 class="text-gray-500 font-semibold uppercase text-xs pl-2">
          My projects
        </h3>
        <button
          @click="handleToggleAddNewProjectForm"
          class="group flex items-center justify-center border border-gray-500 hover:border-blue-500 hover:bg-blue-500 rounded-md w-4 h-4group duration-200"
        >
          <Icon
            name="cuida:plus-outline"
            class="bg-gray-500 text-xs group-hover:bg-white"
          />
        </button>
      </div>
      <ul class="flex flex-col gap-2">
        <li
          v-for="project in projects"
          class="group flex items-center gap-2 p-2 rounded-md hover:bg-indigo-100 cursor-pointer duration-200"
        >
          <span
            class="block w-2 h-2 rounded-full"
            :class="project.color"
          ></span>
          <span
            class="text-gray-500 group-hover:text-gray-900 group-hover:font-semibold duration-200"
            >{{ project.name }}</span
          >
        </li>
      </ul>
    </nav>
  </section>
  <AppLayer v-show="formIsActive" @close-layer="handleToggleAddNewProjectForm">
    <AppAddProjectForm @closeForm="handleToggleAddNewProjectForm" />
  </AppLayer>
</template>
<script setup lang="ts">
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

const projects = [
  {
    name: "Mobile App",
    color: "bg-green-500",
  },
  {
    name: "Website Redesign",
    color: "bg-orange-500",
  },
  {
    name: "Design System",
    color: "bg-purple-500",
  },
  {
    name: "Wireframes",
    color: "bg-rose-500",
  },
];

function toggleSidebar() {
  console.log("Toggle");
}

function handleToggleAddNewProjectForm() {
  formIsActive.value = !formIsActive.value;
}
</script>
