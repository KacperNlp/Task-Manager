<template>
  <div class="relative w-full max-w-md">
    <label
      for="search"
      class="absolute top-1/2 left-2 translate-y-[-50%] cursor-pointer flex items-center"
    >
      <Icon
        name="icon-park-outline:search"
        class="bg-gray-600 hover:bg-blue-500 text-2xl duration-200"
      />
    </label>
    <input
      id="search"
      type="text"
      placeholder="Search for anything..."
      class="w-full pl-12 py-3 pr-2 bg-gray-100 text-sm outline-gray-500 outline-1"
    />
  </div>
</template>
