<script setup lang="ts">
import { defineAsyncComponent } from "vue";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

//@ts-ignore;
import { currentPortal } from "@/utils/portal-helper";

const EntryComponent = defineAsyncComponent(
  () => import("./views/" + currentPortal.getEntry() + ".vue")
);

document.querySelector(".pace").remove();
</script>

<template>
  <EntryComponent />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
