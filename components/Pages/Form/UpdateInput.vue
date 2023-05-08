<script setup lang="ts">
import { PropType } from "vue";

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
    type: String as PropType<any>,
    required: true,
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

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: any) => {
  emit("update:modelValue", event.target.value);
};
</script>
<template>
  <div class="w-full flex flex-col space-y-2">
    <label :for="props.id" class="text-[#B7B7B7] font-bold text-[14px]">
      {{ props.labels }}
    </label>
    <input
      :type="props.types"
      :name="props.id"
      :id="props.id"
      :class="
        isActive
          ? 'px-2 py-2 outline-none ring-1 rounded-md ring-[#E5E7E9] text-[14px]'
          : 'px-2 py-2 outline-none border-b text-[14px]'
      "
      class="transition-all duration-300 disabled:bg-white"
      :placeholder="props.placeholder"
      :value="value"
      :disabled="!isActive"
      @input="updateValue"
    />

    <span class="text-red-500 text-[12px] font-semibold" v-if="errorValidation.length > 0" v-for="e in errorValidation">
      {{ e }}
    </span>
  </div>
</template>
