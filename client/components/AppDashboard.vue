<template>
    <section class="flex flex-col md:flex-row justify-between mb-5 gap-4">
        <AppDashboardTopSection />
        <AppUsersList />
    </section>
    <section class="mb-9">
        <AppTasksFilters />
    </section>
    <AppTasksView />
</template>
