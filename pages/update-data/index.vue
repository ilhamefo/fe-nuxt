<script setup lang="ts">
import { fetchUserLanding } from "@/actions/auth";
import { UserLanding } from "@/models/auth";

import useIndexStore from "@/store/index";
const router = useRouter();
const state = useIndexStore();

const userFlags = ref<UserLanding>({
  need_update_additional_information: false,
  need_update_bank: false,
  need_update_email: false,
  need_update_employment: false,
  need_update_home_address: false,
  need_update_personal_data: false,
  need_update_phone: false,
});

onMounted(() => {
  state.handleLoading(true);

  fetchUserLanding()
    .then((res) => {
      userFlags.value = res;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      state.handleLoading(false);
    });
});
</script>
<template>
  <KeepAlive>
    <div class="h-screen w-full flex items-center justify-center font-inter">
      <div
        class="flex flex-col items-start justify-start h-full w-full max-w-[390px] bg-[#F4F7F8] relative space-y-[25px] shadow-2xl"
      >
        <!-- Header -->
        <PagesHeader />

        <div class="px-[24px] flex items-center justify-between w-full">
          <div class="flex items-center space-x-2">
            <IconsClipboard :size="24" />
            <div class="font-bold text-[16px] text-[#003D79]">Update Data</div>
          </div>
          <div
            class="font-bold text-[12px] text-[#67B2E8]"
            @click="router.back()"
          >
            Back
          </div>
        </div>

        <!-- container card -->
        <div
          class="px-[20px] py-[20px] w-full flex flex-col items-center space-y-3 bg-white h-full"
        >
          <div class="text-[12px] font-bold text-[#DD0000]">
            YOU ARE REQUIRED TO UPDATE THE INFORMATION BELOW
          </div>

          <div class="w-full flex flex-col space-y-3">
            <div
              class="w-full bg-slate-100 h-[80px] rounded-lg animate-pulse"
              v-for="n in 4"
              v-if="state.isLoading"
            ></div>
            <NuxtLink
              :to="{ path: '/update-data/personal-data' }"
              v-if="!state.isLoading"
            >
              <CardStepDetail :isDanger="userFlags.need_update_personal_data">
                <template #icon><IconsUser /></template>
                <template #title>Personal Data</template>
                <template #subtitle>Update your basic information</template>
              </CardStepDetail>
            </NuxtLink>
            <NuxtLink
              :to="{ path: '/update-data/home-address' }"
              v-if="!state.isLoading"
            >
              <CardStepDetail :isDanger="userFlags.need_update_home_address">
                <template #icon><IconsHome /></template>
                <template #title>Home Address</template>
                <template #subtitle>Update your home address</template>
              </CardStepDetail>
            </NuxtLink>
            <NuxtLink
              :to="{ path: '/update-data/employment' }"
              v-if="!state.isLoading"
            >
              <CardStepDetail :isDanger="userFlags.need_update_employment">
                <template #icon><IconsWork /></template>
                <template #title>Employment </template>
                <template #subtitle>Update where you work </template>
              </CardStepDetail>
            </NuxtLink>
            <NuxtLink
              :to="{ path: '/update-data/additional-information' }"
              v-if="!state.isLoading"
            >
              <CardStepDetail
                :isDanger="userFlags.need_update_additional_information"
              >
                <template #icon><IconsDocument /></template>
                <template #title>Additional Information </template>
                <template #subtitle>Update other relevant information</template>
              </CardStepDetail>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </KeepAlive>
</template>
