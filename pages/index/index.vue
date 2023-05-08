<script setup lang="ts">
import useIndexStore from "@/store/index";
import { LoginRequest } from "@/models/auth";
import { doLogin } from "@/actions/auth";

const state = useIndexStore();

const email = ref("christ52@example.org");
const password = ref("password");

function handleLogin() {
  let data: LoginRequest = {
    email: email.value,
    password: password.value,
  };

  doLogin(data);
}
</script>

<template>
  <div class="h-screen w-full flex items-center justify-center font-inter">
    <div
      class="flex flex-col items-start justify-start h-full w-full max-w-[390px] bg-[#F4F7F8] relative"
    >
      <!-- Header -->
      <PagesHeader />

      <!-- Login Card -->
      <div class="w-full px-[20px] py-[25px]">
        <div
          class="bg-white flex items-center flex-col rounded-md px-[20px] py-[20px] space-y-[20px] shadow-sm"
        >
          <div class="">
            <LazyIconsLogin />
          </div>
          <div
            class="text-[22px] text-center font-bold leading-[30px] text-[#003D79] px-5"
          >
            Mandiri Sekuritas Account Management
          </div>
          <!-- {{ state.isFailedLogin }} -->
          <CardInfo v-if="state.isFailedLogin"/>
          <!-- Login Form -->
          <form
            @submit.prevent="handleLogin()"
            action="#"
            class="w-full pt-5 space-y-[15px]"
          >
            <div class="flex flex-col space-y-2">
              <label for="user_id" class="text-[14px]"
                >User ID<span class="text-red-500 text-[14px]">*</span></label
              >
              <input
                v-model="email"
                type="text"
                name="email"
                id="email"
                class="outline-none py-3 px-4 rounded-lg border text-[14px]"
                placeholder="Type your MOST user ID"
              />
              <span
                class="text-sm text-red-500 px-2"
                v-if="
                  state.isValidationError && state.validationErrors.email != ''
                "
                v-for="message in state.validationErrors.email"
              >
                {{ message }}
              </span>
            </div>
            <div class="flex flex-col space-y-2">
              <label for="password" class="text-[14px]"
                >Password<span class="text-red-500 text-[14px]">*</span></label
              >
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                class="outline-none py-3 px-4 rounded-lg border text-[14px]"
                placeholder="Type your MOST password"
                current-password
              />
              <span
                class="text-sm text-red-500 px-2"
                v-if="
                  state.isValidationError &&
                  state.validationErrors.password != ''
                "
                v-for="message in state.validationErrors.password"
              >
                {{ message }}
              </span>
            </div>
            <a
              href="#"
              class="flex items-center justify-end space-y-2 text-[#67B2E8] font-bold text-[14px]"
              >Forgot password?</a
            >

            <div class="pt-2">
              <PagesButton type="submit" :is-active="true">Login</PagesButton>
            </div>
          </form>
        </div>
      </div>

      <!-- Footer -->
      <PagesFooter />
    </div>
  </div>
</template>
