<script setup lang="ts">
const type: "button" | "submit" | "reset" | undefined = "submit";

const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
  // btnType: {
  //   type: String,
  //   required: true,
  // }
});
</script>
<template>
  <button
    class="py-[14px] w-full rounded-full font-bold transition-colors duration-300"
    :class="[props.isActive ? 'bg-[#FFC327] hover:bg-[#ffd877] text-[#003D79]': 'bg-[#EEEEEE] hover:bg-[#d1d1d1] text-[#9497B0]']"
    :disabled="!isActive"
    type="submit"
  >
    <slot></slot>
  </button>
</template>
