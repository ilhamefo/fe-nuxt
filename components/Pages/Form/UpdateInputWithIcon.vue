<script setup lang="ts">
const props = defineProps({
  placeholder: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  labels: {
    type: String,
    required: true,
  },
  types: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});
</script>
<template>
  <div class="w-full flex flex-col space-y-2">
    <label :for="props.id" class="text-[#B7B7B7] font-bold text-[14px]">
      {{ props.labels }}
    </label>
    <div
    :class="isActive ? 'px-2 py-2 outline-none ring-1 rounded-md ring-[#E5E7E9] text-[14px]' : 'px-2 py-2 outline-none border-b text-[14px]'"
      class="transition-all duration-300 disabled:bg-white bg-red-300"
    >
      <input
        :type="props.types"
        :name="props.id"
        :id="props.id"
        class="outline-none px-2 py-2 text-[14px] flex-1 w-full"
        :placeholder="props.placeholder"
        :value="value"
      />
      <div class="px-3 py-2 cursor-pointer">
        <slot name="icon" class=""></slot>
      </div>
    </div>
  </div>
</template>
