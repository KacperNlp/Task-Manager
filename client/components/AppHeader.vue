<template>
  <header
    class="flex flex-nowrap items-center h-[88px] header w-full border-b border-b-zinc-600 py-4 pl-[270px] pr-16"
  >
    <AppSearch />
    <div class="flex flex-nowrap items-center gap-16 ml-auto">
      <AppHeaderActions />
      <AppLoggedUser />
    </div>
  </header>
</template>
