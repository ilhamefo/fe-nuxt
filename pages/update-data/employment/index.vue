<script setup lang="ts">
import useIndexStore from "@/store/index";
import {
  fetchOccupations,
  fetchLineOfBusiness,
  fetchJobTitles,
  fetchSourceOfFund,
  fetchIncome,
  fetchUserData,
  searchSubdistrict,
  submitEmployment,
} from "@/actions/auth";
import {
  Occupations,
  LineOfBusiness,
  JobTitle,
  SourceOfFund,
  Income,
  UserData,
  InitUserData,
  EmploymentPayload,
} from "@/models/auth";
import { SubdistrictResponse } from "@/models/auth";
import axios from "axios";
const router = useRouter();
const state = useIndexStore();

const occupations = ref<Occupations[]>([] as Occupations[]);
const line_of_business = ref<LineOfBusiness[]>([] as LineOfBusiness[]);
const job_titles = ref<JobTitle[]>([] as JobTitle[]);
const source_of_fund = ref<SourceOfFund[]>([] as SourceOfFund[]);
const incomes = ref<Income[]>([] as Income[]);

const isEditable = ref(false);

const userData = ref<UserData>(InitUserData);

const payload = ref<EmploymentPayload>({} as EmploymentPayload);

const errorValidationBag = ref({
  occupation_id: [],
  company_name: [],
  company_address: [],
  company_subdistrict: [],
  line_of_business_id: [],
  job_title_id: [],
  gross_income_id: [],
  income_free_text: [],
  source_of_fund_id: [],
  source_of_fund_free_text: [],
});

function handleSubmit() {
  payload.value = {
    company_address: userData.value.data.company_address,
    company_name: userData.value.data.company_name,
    company_subdistrict_id: selectedSubdistrictID.value,
    gross_income_id: userData.value.data.gross_income_id,
    job_title_id: userData.value.data.job_title_id,
    line_of_business_id: userData.value.data.line_of_business_id,
    occupation_id: userData.value.data.occupation_id,
    source_of_fund_free_text: userData.value.data.source_of_fund_free_text,
    gross_income_free_text: "",
    source_of_fund_id: userData.value.data.source_of_fund_id,
  } as EmploymentPayload;

  submitEmployment(payload.value)
    .then((response) => {
      errorValidationBag.value = {
        occupation_id: [],
        company_name: [],
        company_address: [],
        company_subdistrict: [],
        line_of_business_id: [],
        job_title_id: [],
        gross_income_id: [],
        income_free_text: [],
        source_of_fund_id: [],
        source_of_fund_free_text: [],
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

onMounted(() => {
  fetchUserData()
    .then((response) => {
      userData.value = response;
      if (userData.value.data.company_subdistrict != null) {
        selectedSubdistrictString.value = `${userData.value.data.company_subdistrict.name}, ${userData.value.data.company_subdistrict.district.name}, ${userData.value.data.company_subdistrict.district.city.name} ${userData.value.data.company_subdistrict.district.city.province.name}, ${userData.value.data.company_subdistrict.postal_code}`;
        selectedSubdistrictID.value =
          userData.value.data.company_subdistrict.id;

        console.log(selectedSubdistrictString.value);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  fetchOccupations()
    .then((response) => {
      occupations.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  fetchLineOfBusiness()
    .then((response) => {
      line_of_business.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  fetchJobTitles()
    .then((response) => {
      job_titles.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  fetchSourceOfFund()
    .then((response) => {
      source_of_fund.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  fetchIncome()
    .then((response) => {
      incomes.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
});

const subdistrictLists = ref<SubdistrictResponse[]>([]);
const isFocus = ref<boolean>(false);
const selectedSubdistrictString = ref<string>("");
const selectedSubdistrictID = ref<string>("");

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
      <form
        @submit.prevent="handleSubmit()"
        class="px-[20px] py-[20px] w-full flex flex-col items-center justify-between bg-white h-full relative"
      >
        <ModalSuccess v-if="state.isSuccess" class="z-10" />
        <div class="flex flex-col items-start justify-start w-full space-y-3">
          <div class="flex items-center justify-between w-full">
            <div class="text-[14px]">
              I want to change my
              <span class="font-bold">Employment Information </span>
            </div>
            <button type="button" @click="isEditable = !isEditable">
              <IconsEdit :is-active="isEditable" />
            </button>
          </div>

          <PagesFormSelectOption
            :id="'occupation'"
            :is-active="isEditable"
            :labels="'Pekerjaan'"
            v-model="userData.data.occupation_id"
            :error-validation="errorValidationBag.occupation_id"
          >
            <option
              v-for="item in occupations"
              :value="item.id"
              :selected="item.id == userData.data.occupation_id"
            >
              {{ item.name.id }}
            </option>
          </PagesFormSelectOption>

          <PagesFormUpdateInput
            placeholder="PT. Oninyon Revolusi Kreatif"
            id="company_name"
            labels="Nama Tempat Kerja"
            types="text"
            :value="userData.data.company_name"
            :is-active="isEditable"
            v-model="userData.data.company_name"
          />

          <PagesFormSelectOption
            :id="'bidang_usaha'"
            :is-active="isEditable"
            :labels="'Bidang Usaha'"
            v-model="userData.data.line_of_business_id"
            :error-validation="errorValidationBag.line_of_business_id"
          >
            <option
              v-for="item in line_of_business"
              :value="item.id"
              :selected="item.id == userData.data.line_of_business_id"
            >
              {{ item.name.id }}
            </option>
          </PagesFormSelectOption>

          <PagesFormSelectOption
            :id="'job_title'"
            :is-active="isEditable"
            :labels="'Jabatan'"
            v-model="userData.data.job_title_id"
            :error-validation="errorValidationBag.job_title_id"
          >
            <option
              v-for="item in job_titles"
              :value="item.id"
              :selected="item.id == userData.data.job_title_id"
            >
              {{ item.name.id }}
            </option>
          </PagesFormSelectOption>

          <PagesFormSelectOption
            :id="'source_of_fund'"
            :is-active="isEditable"
            :labels="'Sumber Dana Transaksi'"
            v-model="userData.data.source_of_fund_id"
            :error-validation="errorValidationBag.source_of_fund_id"
          >
            <option
              v-for="item in source_of_fund"
              :value="item.id"
              :selected="item.id == userData.data.source_of_fund_id"
            >
              {{ item.name.id }}
            </option>
          </PagesFormSelectOption>

          <PagesFormUpdateInput
            placeholder="-"
            id="source_of_fund_free_text"
            labels="Sumber Pendapatan Utama"
            types="text"
            value="-"
            :is-active="isEditable"
          />

          <PagesFormSelectOption
            :id="'gross_income'"
            :is-active="isEditable"
            :labels="'Pendapatan Kotor Per Tahun'"
            v-model="userData.data.gross_income_id"
            :error-validation="errorValidationBag.gross_income_id"
          >
            <option
              v-for="item in incomes"
              :value="item.id"
              :selected="item.id == userData.data.gross_income_id"
            >
              {{ item.name.id }}
            </option>
          </PagesFormSelectOption>

          <PagesFormUpdateInput
            placeholder="-"
            id="source_of_fund_free_text_other"
            labels="Pendapatan Lainnya"
            types="text"
            value="-"
            :is-active="isEditable"
          />

          <div class="font-bold text-[#101828] text-[16px] pt-3">
            Employment Address
          </div>

          <PagesFormUpdateInput
            placeholder="Jl  Sudirman No 24"
            id="address"
            labels="Alamat"
            types="text"
            :value="userData.data.company_address"
            :is-active="isEditable"
            v-model="userData.data.company_address"
          />

          <PagesFormUpdateInput
            placeholder="Pasar Minggu, Pasar Minggu, 12520"
            id="subdistrict"
            labels="Kecamatan, Kelurahan, Kode Pos"
            types="text"
            :value="selectedSubdistrictString"
            :is-active="isEditable"
            :error-validation="errorValidationBag.company_subdistrict"
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

        <div class="flex flex-col w-full space-y-3 pt-5">
          <PagesButton :is-active="true" v-if="isEditable">Update</PagesButton>
          <PagesButton :is-active="false" v-if="!isEditable">
            Update
          </PagesButton>
          <PagesButtonOutline
            :is-active="false"
            v-if="!isEditable"
            @click="handleSubmit()"
          >
            No changes to my home address
          </PagesButtonOutline>
        </div>
      </form>
    </div>
  </div>
</template>
