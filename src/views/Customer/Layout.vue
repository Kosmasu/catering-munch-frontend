<template>
  <customer-navbar />
  <router-view></router-view>
</template>

<script>
import CustomerNavbar from "../../components/CustomerNavbar.vue";

export default {
  components: {
    CustomerNavbar,
  },
};
</script>

<style></style>
