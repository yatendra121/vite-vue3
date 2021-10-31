<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
  mounted() {
    this.$nextTick(function () {
      // console.log(this.$axios.get("csadcd"));
    });
  },
});
</script>
