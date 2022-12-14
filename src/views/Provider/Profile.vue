<template>
  <div class="container">
    <div class="border-solid border-2 rounded-lg my-8 p-4">
      <div class="text-3xl">Profile</div>
      <div class="capitalize text-xl underline">{{ this.fullName }}</div>
      <form @submit.prevent="this.updateDesc">
        <div>Description</div>
        <textarea
          v-model="profile.users_desc"
          class="w-full rounded-lg border p-2.5 text-xl"
        />
        <button class="btn btn-primary mt-4 w-full">Save</button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapWritableState } from "pinia";
import { useAuthStore } from "@/stores/Auth/AuthStore.js";
import { useProviderStore } from "@/stores/ProviderStore.js";
import InputVue from "@/components/Inputs/Input.vue";

export default {
  name: "ProviderProfile",
  components: {
    InputVue,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(useProviderStore, ["updateDesc", "fillProfile"]),
  },
  computed: {
    ...mapState(useAuthStore, ["fullName"]),
    ...mapWritableState(useProviderStore, ["profile"]),
    ...mapState(useProviderStore, ["errorData"]),
  },
  created() {
    this.fillProfile();
  },
};
</script>
<style></style>
