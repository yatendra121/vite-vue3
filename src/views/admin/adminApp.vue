<template>
  <div
    class="
      p-6
      max-w-sm
      mx-auto
      bg-white
      rounded-xl
      shadow-md
      flex
      items-center
      space-x-4
    "
  >
    <div class="flex-shrink-0">
      <img
        class="h-12 w-12"
        :src="authProfile.profile_image ? authProfile.profile_image.path : ''"
        alt="ChitChat Logo"
      />
    </div>
    <div>
      <div class="text-xl font-medium text-black">{{ authProfile.name }}</div>
      <p class="text-gray-500">{{ authProfile.email }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    console.log(store.getters.authProfile);
    return {
      // access a getter in computed function
      authProfile: computed(() => store.getters.authProfile),
    };
  },
});
</script>
