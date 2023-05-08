<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  labels: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  errorValidation: {
    type: Array,
    required: false,
    default: [],
  },
});

const emit = defineEmits(['update:modelValue'])

const updateValue = (event:any) => {
    emit('update:modelValue', event.target.value)
}
</script>
<template>
  <div class="flex flex-col w-full space-y-2">
    <label :for="props.id" class="text-[#B7B7B7] font-bold text-[14px]">
      {{ props.labels }}
    </label>
    <select
      :name="props.id"
      :id="props.id"
      :class="
        isActive
          ? 'px-2 py-2 outline-none ring-1 rounded-md ring-[#E5E7E9] text-[14px]'
          : 'px-2 py-2 outline-none border-b text-[14px]'
      "
      :disabled="!isActive"
      @input="updateValue"
    >
      <option value="">--Pilih--</option>
      <slot></slot>
    </select>

    <span class="text-red-500 text-[12px] font-semibold" v-if="errorValidation.length > 0" v-for="e in errorValidation">
      {{ e }}
    </span>
  </div>
</template>
