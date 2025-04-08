<template>
    <section
        class="fixed top-0 bg-zinc-900 h-screen w-screen md:w-[300px] z-10 border-r border-r-zinc-600 z-1 duration-500"
        :class="{
            '-translate-x-[100dvw] md:-translate-x-[300px]': isSidebarActive,
        }"
    >
        <div class="flex items-center gap-2 h-[88px] px-5 py-6">
            <img src="/project-logo.svg" alt="Task Manager" />
            <h2 class="text-xl font-semibold mr-10">Project M.</h2>
            <button
                @click="toggleSidebar"
                aria-label="Hide sidebar"
                class="flex items-center ml-auto"
            >
                <Icon name="mingcute:arrows-left-line" class="bg-gray-400 text-2xl" />
            </button>
        </div>
        <nav class="px-5">
            <ul class="nav flex flex-col gap-6 border-b border-b-zinc-600 py-6">
                <li v-for="link in links">
                    <NuxtLink
                        :to="link.to"
                        @click="handleClickLink"
                        class="group flex items-center gap-4 hover:text-emerald-500"
                    >
                        <span class="link-icon flex items-center justify-center">
                            <Icon
                                :name="link.icon"
                                class="bg-gray-400 text-2xl group-hover:bg-emerald-500"
                            />
                        </span>
                        <span>{{ link.text }}</span>
                    </NuxtLink>
                </li>
            </ul>
            <div class="flex justify-between mt-6 mb-5">
                <h3 class="text-gray-400 font-semibold uppercase text-xs pl-2">My projects</h3>
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
                <li v-if="projectsStore.isProjectsLoaded" v-for="project in projectsStore.projects">
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
                <li v-else v-for="n in 3" :key="n"><AppSmallPlaceholder /></li>
            </ul>
        </nav>
    </section>
    <UModal v-model="formIsActive">
        <AppAddProjectForm @closeForm="handleToggleAddNewProjectForm" />
    </UModal>
</template>

<script setup lang="ts">
const { $websocket } = useNuxtApp();

const emit = defineEmits(['changeSidebarVisibility']);

const props = defineProps({
    isSidebarActive: {
        type: Boolean,
        required: true,
    },
});

const projectsStore = useProjectsStore();
const searchStore = useSearchStore();

const formIsActive = ref(false);

const links = [
    {
        text: 'Home',
        icon: 'clarity:blocks-group-solid',
        to: '/',
    },
    {
        text: 'Tasks',
        icon: 'fluent:task-list-rtl-24-regular',
        to: '/tasks',
    },
    {
        text: 'Members',
        icon: 'mynaui:users-group',
        to: '/members',
    },
    {
        text: 'Settings',
        icon: 'lsicon:setting-outline',
        to: '/settings',
    },
];

function isSelectedProject(projectId: string) {
    return projectId === projectsStore.currentProjectId;
}

function handleClickLink() {
    emit('changeSidebarVisibility', !props.isSidebarActive);
    searchStore.clearSearch();
}

function toggleSidebar() {
    emit('changeSidebarVisibility', !props.isSidebarActive);
}

function handleToggleAddNewProjectForm() {
    formIsActive.value = !formIsActive.value;
}

function handleClickChangeProject(projectId: string) {
    projectsStore.changeCurrentProject(projectId);
    toggleSidebar();

    searchStore.clearSearch();
    $websocket.connect(projectId);
}
</script>

<style>
.nav .router-link-active {
    color: #10b981;

    .link-icon span {
        background-color: #10b981;
    }
}
</style>
