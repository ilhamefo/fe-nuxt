<template>
  <div
    class="w-[300px] bg-white h-[80px] rounded-lg flex shadow-lg hover:bg-slate-100 cursor-pointer transition-colors duration-150 relative ring-2 ring-red-400"
  >
    <div
      class="w-[24px] bg-red-400 h-full flex items-center justify-center rounded-l-lg"
    >
      <IconsCheckV2 />
    </div>
    <div class="flex flex-col justify-start items-start space-y-1 p-3">
      <div class="font-inter text-red-400 font-bold text-[16px]">Uh oh 😥</div>
      <div class="text-[14px] text-red-400 font-medium">
        Invalid email or password
      </div>
    </div>
  </div>
</template>
