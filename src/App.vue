<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import useAuthUserRepository from "@/composables/auth/useAuthUserRepository";

const { myProfile, finished } = useAuthUserRepository();
myProfile("my-profile").then(() => {});
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

//@ts-ignore;
import { currentPortal } from "@/utils/portal-helper";

const EntryComponent = defineAsyncComponent(
  () => import("./views/" + currentPortal.getEntry() + ".vue")
);
</script>
