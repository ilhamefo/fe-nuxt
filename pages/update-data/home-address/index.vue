<script setup lang="ts">
import { searchSubdistrict } from "@/actions/auth";
import { fetchUserData, submitHomeAddress } from "@/actions/auth";
import useIndexStore from "@/store/index";
import axios from "axios";
import {
  InitUserData,
  UserData,
  SubdistrictResponse,
  HomeAddressPayload,
} from "@/models/auth";
const router = useRouter();
const state = useIndexStore();

const isEditable = ref(false);

const userData = ref<UserData>(InitUserData);

const subdistrictLists = ref<SubdistrictResponse[]>([]);

const isFocus = ref<boolean>(false);

const selectedSubdistrictID = ref<string>("");

const selectedSubdistrictString = ref<string>("");

const errorValidationBag = ref({
  address: [],
  subdistrict_id: [],
});

onMounted(() => {
  fetchUserData().then((res) => {
    userData.value = res;
    if (userData.value.data.subdistrict != null) {
      selectedSubdistrictString.value = `${userData.value.data.subdistrict.name}, ${userData.value.data.subdistrict.district.name}, ${userData.value.data.subdistrict.district.city.name} ${userData.value.data.subdistrict.district.city.province.name}, ${userData.value.data.subdistrict.postal_code}`;
      selectedSubdistrictID.value = userData.value.data.subdistrict.id;
    }
    console.log(selectedSubdistrictID.value);
  });
});

function handleSubmit(data: HomeAddressPayload) {
  submitHomeAddress(data)
    .then((res) => {
      errorValidationBag.value = {
        address: [],
        subdistrict_id: [],
      };

      isEditable.value = false;
      state.handleSuccess(true);
    })
    .catch((err) => {
      if (err.response.status === 422) {
        errorValidationBag.value = err.response.data.errors;
        console.log(errorValidationBag.value);
      }
    });
}

function handleSearchSubdistrict(keyword: string) {
  searchSubdistrict(keyword)
    .then((resp) => {
      subdistrictLists.value = resp.data;
    })
    .catch((err) => {
      if (!axios.isCancel(err)) {
        console.log(err);
      }
    });
}

function selectSubdistrict(id: string) {
  isFocus.value = false;
  selectedSubdistrictID.value = id;

  const selectedSub = subdistrictLists.value.filter((sub) => sub.id === id);

  selectedSubdistrictString.value = `${selectedSub[0].sub_district}, ${selectedSub[0].district}, ${selectedSub[0].city}, ${selectedSub[0].province}, ${selectedSub[0].zipcode}.`;
}
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
      <form
        @submit.prevent="
          handleSubmit({
            address: userData.data.address,
            subdistrict_id: selectedSubdistrictID,
          })
        "
        class="px-[20px] py-[20px] w-full flex flex-col items-center justify-between bg-white h-full relative"
      >
        <ModalSuccess v-if="state.isSuccess" />
        <div class="flex flex-col items-center justify-start w-full space-y-3">
          <div class="flex items-center justify-between w-full">
            <div class="text-[14px]">
              I want to change my <span class="font-bold">Home Address </span>
            </div>
            <button type="button" @click="isEditable = !isEditable">
              <IconsEdit :is-active="isEditable" />
            </button>
          </div>
          <PagesFormUpdateInput
            placeholder="Jl Sudirman No. 24"
            id="address"
            labels="Address"
            types="text"
            :value="userData.data.address"
            :is-active="isEditable"
            v-model="userData.data.address"
            :error-validation="errorValidationBag.address"
          />

          <PagesFormUpdateInput
            placeholder="Pasar Minggu, Pasar Minggu, 12520"
            id="subdistrict"
            labels="Kecamatan, Kelurahan, Kode Pos"
            types="text"
            :value="selectedSubdistrictString"
            :is-active="isEditable"
            :error-validation="errorValidationBag.subdistrict_id"
            v-model.lazy="selectedSubdistrictString"
            @input="handleSearchSubdistrict(selectedSubdistrictString)"
            @focusin="
              () => {
                isFocus = true;
                selectedSubdistrictString = '';
              }
            "
          />

          <div
            class="w-full rounded-lg divide-y-2 border border-slate-100 shadow-lg"
            v-if="isFocus"
          >
            <div
              class="px-2 py-3 hover:bg-slate-100 cursor-pointer text-[14px] transition-colors"
              v-for="item in subdistrictLists"
              @click="selectSubdistrict(item.id)"
            >
              {{
                `${item.sub_district}, ${item.district}, ${item.city}, ${item.province}, ${item.zipcode}.`
              }}
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full space-y-3">
          <PagesButton :is-active="true" v-if="isEditable">
            Update
          </PagesButton>
          <PagesButton :is-active="false" v-if="!isEditable">
            Update
          </PagesButton>
          <PagesButtonOutline :is-active="false" v-if="!isEditable">
            No changes to my home address
          </PagesButtonOutline>
        </div>
      </form>
    </div>
  </div>
</template>
