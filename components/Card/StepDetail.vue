<script setup lang="ts">
const props = defineProps({
  isDanger: {
    type: Boolean,
    required: true,
  },
});
</script>
<template>
  <div
    class="px-[20px] py-[15px] rounded-lg border flex items-center justify-between w-full cursor-pointer hover:bg-slate-50 transition-colors duration-200"
  >
    <div class="flex items-center space-x-4">
      <slot name="icon"></slot>
      <div class="flex flex-col items-start">
        <div class="text-[14px] font-bold text-[#101828]">
          <slot name="title"></slot>
        </div>
        <div
          class="text-[12px] flex items-center space-x-1"
          :class="[isDanger ? 'text-[#D44242]' : 'text-[#101828]']"
        >
          <span class=""> <slot name="subtitle"></slot> </span>
          <IconsDanger :size="16" v-if="isDanger" />
        </div>
      </div>
    </div>

    <IconsCheck :isDanger="isDanger" />
  </div>
</template>
