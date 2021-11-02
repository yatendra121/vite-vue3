<template>
  <div id="nav" v-if="authLoading">
    <router-link to="/">Home</router-link> |
    <router-link to="/auth">Auth</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/admin-app">Admin </router-link>
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent, watch, watchEffect } from "vue";
import router from "@/router";
export default defineComponent({
  props: {
    authLoading: {
      type: Boolean,
      required: true,
    },
    hasAuth: {
      required: true,
    },
  },
  setup(props) {
    const redirectToAuth = () => {
      if (props.hasAuth === true) router.push({ name: "auth" });
    };

    watch(props, () => {
      redirectToAuth();
    });

    redirectToAuth();
  },
  mounted() {
    this.$nextTick(function () {
      setTimeout(() => {
        let appLoading = document.querySelector("#initial_startup");
        if (appLoading) appLoading.remove();
      }, 300);
    });
  },
});
</script>
