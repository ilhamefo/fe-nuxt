<script setup lang="ts">
const props = defineProps({
  size: {
    type: Number,
    required: true,
  },
});

</script>
<template>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 7.5V11.6667"
      stroke="#DD0000"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.0001 17.8419H4.95011C2.05844 17.8419 0.850107 15.7752 2.25011 13.2502L4.85011 8.56689L7.30011 4.16689C8.78344 1.49189 11.2168 1.49189 12.7001 4.16689L15.1501 8.57523L17.7501 13.2586C19.1501 15.7836 17.9334 17.8502 15.0501 17.8502H10.0001V17.8419Z"
      stroke="#DD0000"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.99536 14.1665H10.0028"
      stroke="#DD0000"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
