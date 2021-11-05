<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import useAuthUserRepository from "@/composables/auth/useAuthUserRepository";

const { myProfile, finished } = useAuthUserRepository();
const hasAuth = ref<null|Boolean>(null);
myProfile("my-profile").then(() => {
  hasAuth.value = true;
});
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

//@ts-ignore;
import { currentPortal } from "@/utils/portal-helper";

const EntryComponent = defineAsyncComponent(
  () => import("./views/" + currentPortal.getEntry() + ".vue")
);
</script>
<template>
  <EntryComponent :has-auth="hasAuth" :auth-loading="finished" />
</template>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
