<script setup lang="ts">
import {
  fetchUserData,
  GetYear,
  GetDate,
  fetchUserLanding,
} from "@/actions/auth";
import { UserData, UserLanding } from "@/models/auth";
import useIndexStore from "@/store/index";

const state = useIndexStore();

const data = ref<UserData>({
  created_at: "",
  email: "",
  email_verified_at: "",
  id: "",
  name: "",
  updated_at: "",
  birth_date: null,
  birth_place: "",
  gender: "",
  mother_name: "",
  nik: "",
  npwp: "",
});

const userFlags = ref<UserLanding>({
  need_update_additional_information: false,
  need_update_bank: false,
  need_update_email: false,
  need_update_employment: false,
  need_update_home_address: false,
  need_update_personal_data: false,
  need_update_phone: false,
});

const updateData = ref(false);

onMounted(() => {
  state.handleLoading(true);

  fetchUserData()
    .then((res) => {
      data.value = res;
    })
    .catch((err) => {
      console.log(err.response);
    })
    .finally(() => {
      state.handleLoading(false);
    });

  fetchUserLanding()
    .then((res) => {
      userFlags.value = res;
      console.log(userFlags.value);

      updateData.value =
        userFlags.value.need_update_personal_data ||
        userFlags.value.need_update_additional_information ||
        userFlags.value.need_update_home_address ||
        userFlags.value.need_update_employment;
    })
    .catch((err) => console.log(err));
});
</script>
<template>
  <div class="h-screen w-full flex items-center justify-center font-inter">
    <div
      class="flex flex-col items-start justify-start h-full w-full max-w-[390px] bg-[#F4F7F8] relative space-y-[25px]"
    >
      <!-- Header -->
      <PagesHeader />

      <div class="px-12 space-y-2">
        <div
          class="text-[#003D79] font-bold text-[26px] leading-[30px] text-center"
        >
          Mandiri Sekuritas Account Management
        </div>
        <div
          class="text-[#003D79] font-normal text-[16px] leading-[30px] text-center"
        >
          Keep your MOST Account up-to-date
        </div>
      </div>

      <div
        class="bg-white flex items-center px-[50px] py-[24px] w-full space-x-3"
      >
        <div class="ring rounded-full ring-[#67B9E8]">
          <LazyIconsAvaPlaceholder />
        </div>

        <div class="flex flex-col w-full space-y-2" v-if="state.isLoading">
          <div class="h-4 w-full bg-slate-200 animate-pulse rounded-lg"></div>
          <div class="h-4 w-3/4 bg-slate-200 animate-pulse rounded-lg"></div>
          <div class="h-4 w-2/4 bg-slate-200 animate-pulse rounded-lg"></div>
        </div>

        <div class="flex flex-col" v-else>
          <div class="font-bold text-[18px]">{{ data.name }}</div>

          <div class="font-bold text-[14px] text-[#003D79]">
            Customer since {{ GetYear(data.created_at) }}
          </div>
          <div class="font-medium text-[12px] text-[#B7B7B7] leading-8">
            Last update - {{ GetDate(data.updated_at) }}
          </div>
        </div>
      </div>

      <!-- container card -->
      <div class="px-[20px] w-full flex flex-col items-center space-y-3">
        <NuxtLink to="/update-data" class="w-full">
          <CardStep :isDanger="updateData">
            <template #icon><IconsClipboard :size="24" /></template>
            <template #title>Update Data</template>
            <template #subtitle v-if="updateData"
              >You are required to update your data</template
            >
            <template #subtitle v-else>Update your data anytime</template>
          </CardStep>
        </NuxtLink>
        <CardStep :isDanger="userFlags.need_update_phone">
          <template #icon><IconsPhone /></template>
          <template #title>Phone Number</template>
          <template #subtitle v-if="userFlags.need_update_phone"
            >You are required to update your phone number</template
          >
          <template #subtitle v-else>Update your phone number anytime</template>
        </CardStep>
        <CardStep :isDanger="userFlags.need_update_email">
          <template #icon><IconsMail /></template>
          <template #title>Email Address</template>
          <template #subtitle v-if="userFlags.need_update_email"
            >You are required to update your email address</template
          >
          <template #subtitle v-else
            >Update your email address anytime</template
          >
        </CardStep>
        <CardStep :isDanger="userFlags.need_update_bank">
          <template #icon><IconsBank /></template>
          <template #title>Bank Account</template>
          <template #subtitle v-if="userFlags.need_update_bank"
            >You are required to update your bank account</template
          >
          <template #subtitle v-else>Update your bank account anytime</template>
        </CardStep>
      </div>
    </div>
  </div>
</template>
