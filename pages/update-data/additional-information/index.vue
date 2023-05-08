<script setup lang="ts">
import useIndexStore from "@/store/index";
const router = useRouter();
const state = useIndexStore();

const bidang_usaha = ref(["IT", "Kontraktor", "PNS"]);
const gross_income = ref(["1 - 5 JT", "5 - 10 JT", "1M - 1T"]);

const isEditable = ref(false);

function handleSubmit(params: boolean) {
  state.handleSuccess(params);
}
</script>
<template>
  <div class="h-screen w-full flex items-center justify-center font-inter">
    <div
      class="flex flex-col items-start justify-start h-full w-full max-w-[390px] bg-[#F4F7F8] relative space-y-[25px] shadow-2xl"
    >
      <!-- Header -->
      <PagesHeader class="flex-1 py-3" />

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
        <div class="flex flex-col items-start justify-start w-full space-y-3">
          <div class="flex items-center justify-between w-full">
            <div class="text-[14px]">
              I want to change my
              <span class="font-bold">Additional Information </span>
            </div>
            <button type="button" @click="isEditable = !isEditable">
              <IconsEdit :is-active="isEditable" />
            </button>
          </div>
          
          <PagesFormUpdateInput
            placeholder="Nana"
            id="spouse_name"
            labels="Nama Pasangan / Orang Tua"
            types="text"
            value="Nana"
            :is-active="isEditable"
          />

          <PagesFormUpdateInput
            placeholder="Agency"
            id="rp_job"
            labels="Nama Tempat Bekerja Pasangan / Orang Tua"
            types="text"
            value="Agency"
            :is-active="isEditable"
          />

          <PagesFormUpdateInput
            placeholder="8 Tahun"
            id="rp_job_since"
            labels="Lama Bekerja Pasangan / Orang Tua"
            types="text"
            value="8 Tahun"
            :is-active="isEditable"
          />

          <PagesFormSelectOption
            :id="'rp_occupation'"
            :is-active="isEditable"
            :labels="'Bidang Usaha Pasangan / Orang tua'"
          >
            <option v-for="item in bidang_usaha" :value="item">
              {{ item }}
            </option>
          </PagesFormSelectOption>

          <PagesFormSelectOption
            :id="'rp_incomes'"
            :is-active="isEditable"
            :labels="'Pendapatan Kotor Per Tahun Bekerja Pasangan / Orang Tua'"
          >
            <option v-for="item in gross_income" :value="item">
              {{ item }}
            </option>
          </PagesFormSelectOption>

          <PagesFormSelectOption
            :id="'rp_incomes_other'"
            :is-active="isEditable"
            :labels="'Pendapatan Lainnya Bekerja Pasangan / Orang Tua'"
          >
            <option v-for="item in gross_income" :value="item">
              {{ item }}
            </option>
          </PagesFormSelectOption>


        </div>

        <div class="flex flex-col w-full space-y-3 pt-5">
          <PagesButton
            :is-active="true"
            v-if="isEditable"
            @click="handleSubmit(true)"
            >Update</PagesButton
          >
          <PagesButton :is-active="false" v-if="!isEditable">
            Update
          </PagesButton>
          <PagesButtonOutline
            :is-active="false"
            v-if="!isEditable"
            @click="handleSubmit(true)"
          >
            No changes to my home address
          </PagesButtonOutline>
        </div>
      </div>
    </div>
  </div>
</template>
