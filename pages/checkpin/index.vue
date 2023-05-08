<script setup>
const router = useRouter();

const pin1 = ref(null);
const pin2 = ref(null);
const pin3 = ref(null);
const pin4 = ref(null);
const pin5 = ref(null);
const pin6 = ref(null);
const value1 = ref("");
const value2 = ref("");
const value3 = ref("");
const value4 = ref("");
const value5 = ref("");
const value6 = ref("");

function focusNext(event, nextInput) {
  const next = this[nextInput];
  if (next) {
    next.focus();
  }
}

function handleSubmit(params) {
  router.push({ path: "/update-data" });
}
</script>

<template>
  <div class="h-screen w-full flex items-center justify-center font-inter">
    <div
      class="flex flex-col items-start justify-start h-full w-full max-w-[390px] bg-[#F4F7F8] relative"
    >
      <!-- Header -->
      <PagesHeader />

      <!-- Check Pin Card -->
      <div class="w-full px-[20px] py-[25px]">
        <div
          class="bg-white flex items-center flex-col rounded-md px-[20px] pt-[44px] pb-[20px] space-y-[20px] shadow-sm"
        >
          <div
            class="text-[22px] text-center font-bold leading-[30px] text-[#003D79] px-5"
          >
            Enter PIN
          </div>
          <!-- Login Form -->
          <form
            @submit.prevent=""
            action="#"
            class="w-full pt-5 space-y-[15px]"
          >
            <div class="grid grid-cols-6 gap-2">
              <input
                type="text"
                maxlength="1"
                pattern="[0-9]*"
                ref="pin1"
                v-model="value1"
                @input="focusNext($event, 'pin2')"
                class="outline-none py-3 px-4 rounded-lg border text-[14px] flex items-center justify-center"
                placeholder="*"
              />
              <input
                type="text"
                maxlength="1"
                pattern="[0-9]*"
                ref="pin2"
                v-model="value2"
                @input="focusNext($event, 'pin3')"
                class="outline-none py-3 px-4 rounded-lg border text-[14px] flex items-center justify-center"
                placeholder="*"
              />
              <input
                ref="pin3"
                v-model="value3"
                @input="focusNext($event, 'pin4')"
                type="text"
                maxlength="1"
                pattern="[0-9]*"
                class="outline-none py-3 px-4 rounded-lg border text-[14px] flex items-center justify-center"
                placeholder="*"
              />
              <input
                ref="pin4"
                v-model="value4"
                @input="focusNext($event, 'pin5')"
                type="text"
                maxlength="1"
                pattern="[0-9]*"
                class="outline-none py-3 px-4 rounded-lg border text-[14px] flex items-center justify-center"
                placeholder="*"
              />
              <input
                ref="pin5"
                v-model="value5"
                @input="focusNext($event, 'pin6')"
                type="text"
                maxlength="1"
                pattern="[0-9]*"
                class="outline-none py-3 px-4 rounded-lg border text-[14px] flex items-center justify-center"
                placeholder="*"
              />
              <input
                ref="pin6"
                v-model="value6"
                type="text"
                maxlength="1"
                pattern="[0-9]*"
                class="outline-none py-3 px-4 rounded-lg border text-[14px] flex items-center justify-center"
                placeholder="*"
              />
            </div>
            <a
              href="#"
              class="flex items-center justify-start space-y-2 text-[#67B2E8] font-bold text-[14px]"
              >Forgot PIN? Call customer service</a
            >

            <div class="pt-2">
              <PagesButton
                type="submit"
                :is-active="true"
                @click="handleSubmit()"
                >Send</PagesButton
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
