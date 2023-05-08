<script setup lang="ts">
import {
  fetchUserData,
  fetchGenders,
  submitPersonalData,
} from "@/actions/auth";
import useIndexStore from "@/store/index";
import { UserData, GenderModel, InitUserData } from "~~/models/auth";

const router = useRouter();
const state = useIndexStore();
const isEditable = ref(false);

const errorValidationBag = ref({
  name: [],
  birth_date: [],
  birth_place: [],
  gender: [],
  mother_name: [],
  nik: [],
  npwp: [],
});

const userData = ref<UserData>(InitUserData);

const genders = ref<GenderModel[]>([]);

function handleSubmit(data: UserData) {
  submitPersonalData(data)
    .then((res) => {
      errorValidationBag.value = {
        name: [],
        birth_date: [],
        birth_place: [],
        gender: [],
        mother_name: [],
        nik: [],
        npwp: [],
      };

      isEditable.value = false;
      state.handleSuccess(true);
    })
    .catch((err) => {
      if (err.response.status === 422) {
        errorValidationBag.value = err.response.data.errors;
      }
    });
}

onMounted(() => {
  fetchUserData().then((res) => {
    userData.value = res;
  });

  fetchGenders()
    .then((res) => {
      genders.value = res;
    })
    .catch((err) => {
      console.log(err.response);
    });
});
</script>
<template>
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
        <button
          class="font-bold text-[12px] text-[#67B2E8]"
          @click="router.back()"
        >
          Back
        </button>
      </div>

      <!-- container card -->
      <div
        class="px-[20px] py-[20px] w-full flex flex-col items-center justify-between bg-white h-full relative"
      >
        <ModalSuccess v-if="state.isSuccess" class="z-10" />

        <form
          @submit.prevent="handleSubmit(userData)"
          class="flex flex-col items-center justify-start w-full space-y-3 z-0"
        >
          <div class="flex items-center justify-between w-full">
            <div class="text-[14px]">
              I want to change my <span class="font-bold">Personal Data </span>
            </div>
            <button type="button" @click="isEditable = !isEditable">
              <IconsEdit :is-active="isEditable" />
            </button>
          </div>
          <PagesFormUpdateInput
            placeholder="John Doe"
            id="name"
            labels="Nama"
            types="text"
            :value="userData.data.name"
            v-model="userData.data.name"
            :is-active="isEditable"
            :error-validation="errorValidationBag.name"
          />

          <PagesFormUpdateInput
            placeholder="dd-mm-yyyy"
            id="birth_date"
            labels="Tanggal Lahir"
            types="date"
            :value="userData.data.birth_date"
            v-model="userData.data.birth_date"
            :is-active="isEditable"
            :error-validation="errorValidationBag.birth_date"
          />
          <PagesFormUpdateInput
            placeholder="Jakarta"
            id="birth_place"
            labels="Tempat Lahir"
            types="text"
            :value="userData.data.birth_place"
            v-model="userData.data.birth_place"
            :is-active="isEditable"
            :error-validation="errorValidationBag.birth_place"
          />
          <PagesFormUpdateInput
            placeholder="1234123412341234"
            id="nik"
            labels="NIK"
            types="text"
            :value="userData.data.nik"
            v-model="userData.data.nik"
            :is-active="isEditable"
            :error-validation="errorValidationBag.nik"
          />

          <PagesFormUpdateInput
            placeholder="12 . 3412 . 341 . 23"
            id="npwp_number"
            labels="NPWP"
            types="text"
            :value="userData.data.npwp"
            v-model="userData.data.npwp"
            :is-active="isEditable"
            :error-validation="errorValidationBag.npwp"
          />
          <PagesFormUpdateInput
            placeholder="Susi Susanti"
            id="mother_name"
            labels="Nama Ibu Kandung"
            types="text"
            :value="userData.data.mother_name"
            v-model="userData.data.mother_name"
            :is-active="isEditable"
            :error-validation="errorValidationBag.mother_name"
          />
          <PagesFormSelectOption
            id="gender"
            :labels="'Gender'"
            :is-active="isEditable"
            v-model="userData.data.gender"
            :error-validation="errorValidationBag.gender"
          >
            <option
              v-for="item in genders"
              :value="item.id"
              :selected="item.id == userData.data.gender.id"
            >
              {{ item.name.id }}
            </option>
          </PagesFormSelectOption>

          <div class="flex flex-col w-full space-y-3 pt-5">
            <PagesButton :is-active="true" v-if="isEditable">
              Update
            </PagesButton>
            <PagesButton :is-active="false" v-if="!isEditable">
              Update
            </PagesButton>
            <PagesButtonOutline
              :is-active="false"
              v-if="!isEditable"
              @click="handleSubmit(userData)"
            >
              My personal data is still the same
            </PagesButtonOutline>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
