<script setup lang="ts">
import useIndexStore from "@/store/index";

const state = useIndexStore();

function handleSubmit(params: boolean) {
  state.handleSuccess(params);
}
</script>
<template>
  <div
    class="w-full h-full bg-black/50 absolute top-0 flex flex-col px-10 py-10"
  >
    <div
      class="bg-white rounded-xl px-3 py-[60px] flex flex-col items-center justify-center space-y-2"
    >
      <IconsSuccessCircle />
      <div class="font-bold text-[18px] text-[#339900]">Success!</div>
      <div class="text-[#363636] text-[14px] pb-5">
        You have changed your personal data
      </div>
      <PagesButton :is-active="true" @click="handleSubmit(false)">OK</PagesButton>
    </div>
  </div>
</template>
