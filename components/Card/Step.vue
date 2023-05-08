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
    class="bg-white w-full flex py-3 px-3 rounded-xl items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
  >
    <div class="flex items-center space-x-2">
      <slot name="icon"></slot>
      <div class="flex flex-col space-y-1">
        <div class="font-bold text-[14px] text-[#3B4752]">
          <slot name="title"></slot>
        </div>
        <div class="text-[12px] "
            :class="[props.isDanger ? 'text-[#DD0000]': 'text-[#3B4752]']"
        >
          <slot name="subtitle"></slot>
        </div>
      </div>
    </div>

    <IconsDanger v-if="props.isDanger" :size="20"/>
  </div>
</template>
