<template>
  <provider-navbar />
  <router-view></router-view>
</template>

<script>
import ProviderNavbar from "@/components/ProviderNavbar.vue";

export default {
  components: {
    ProviderNavbar,
  },
};
</script>

<style></style>
