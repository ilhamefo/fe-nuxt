<template>
  <PagesFormTestInput v-model="inputValue" />
  {{ inputValue }}
</template>

<script setup>
const inputValue = ref("");
</script>
