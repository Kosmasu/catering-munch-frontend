<template>
  <div class="container">
    <div class="m-12 font-semibold text-4xl text-center">Profile</div>
    <div class="border-2 p-4 rounded-lg text-xl">
      <table class="border-separate w-full">
        <tbody v-if="profile">
          <tr>
            <td>Nama</td>
            <td>:</td>
            <td class="capitalize">{{ profile.users_nama }}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>:</td>
            <td>{{ profile.users_email }}</td>
          </tr>
          <tr>
            <td>Nomor Telepon</td>
            <td>:</td>
            <td>{{ profile.users_telepon }}</td>
          </tr>
          <tr>
            <td>Alamat</td>
            <td>:</td>
            <td>{{ profile.users_alamat }}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>:</td>
            <td>
              <textarea
                v-model="profile.users_desc"
                class="w-full rounded-lg border p-2.5"
              />
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <button
                @click="this.updateDesc"
                class="btn btn-primary mt-4 w-full"
              >
                Save
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!profile" class="text-center">
        <font-awesome-icon
          icon="fa-solid fa-spinner"
          class="text-6xl animate-spin"
        />
      </div>
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
    ...mapActions(useProviderStore, ["updateDesc", "fetchProfile"]),
  },
  computed: {
    ...mapState(useAuthStore, ["profile"]),
    ...mapWritableState(useProviderStore, ["profile"]),
    ...mapState(useProviderStore, ["errorData"]),
  },
  created() {
    this.fetchProfile();
  },
};
</script>
<style></style>
