<template>
  <div class="border-solid border-2 rounded-lg m-12 p-4">
    <div class="flex justify-between mb-8">
      <div class="text-3xl m-2">List of Providers</div>
      <div class="flex space-x-8">
        <div>
          <div>Showing :</div>
          <div v-if="providers">
            <div v-if="usersSearch('provider', query).length <= 1">
              {{ usersSearch("provider", query).length }} Provider
            </div>
            <div v-else>
              {{ usersSearch("provider", query).length }} Providers
            </div>
          </div>
        </div>
        <input
          type="text"
          v-model="query"
          placeholder="Search…"
          class="input input-primary input-bordered"
        />
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="table table-compact w-full text-center">
        <thead>
          <tr>
            <th class="bg-primary">ID</th>
            <th class="bg-primary">Nama</th>
            <th class="bg-primary">Email</th>
            <th class="bg-primary">Alamat</th>
            <th class="bg-primary">Nomor Telepon</th>
            <th class="bg-primary">Status</th>
            <th class="bg-primary">Action</th>
          </tr>
        </thead>
        <tbody v-if="providers">
          <tr v-for="provider in usersSearch('provider', query)" class="hover">
            <td>{{ provider.users_id }}</td>
            <td>{{ provider.users_nama }}</td>
            <td>{{ provider.users_email }}</td>
            <td>{{ provider.users_alamat }}</td>
            <td>{{ provider.users_telepon }}</td>
            <td>{{ provider.users_status.toUpperCase() }}</td>
            <td>
              <button
                v-if="provider.users_status == 'aktif'"
                @click="ban(provider.users_id)"
                class="btn btn-error rounded-lg"
              >
                Ban
              </button>
              <button
                v-else
                @click="unban(provider.users_id)"
                class="btn btn-primary rounded-lg"
              >
                Unban
              </button>
            </td>
          </tr> 
          <!-- <tr v-if="(!providers || providers.length == 0)">
            <td colspan="6" class="text-lg font-semibold text-center">Kosong...</td>
          </tr> -->
        </tbody>
        <tbody v-else>
          <tr>
            <td class="text-center" colspan="7">
              <font-awesome-icon
                icon="fa-solid fa-spinner"
                class="text-6xl animate-spin"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useAdminStore } from "@/stores/AdminStore";
import Navbar from "@/components/AdminNavbar.vue";
import AdminLayout from "@/views/Admin/Layout.vue";

export default {
  name: "AdminProviders",
  components: {
    Navbar,
    AdminLayout,
  },
  data() {
    return {
      query: "",
    };
  },
  methods: {
    ...mapActions(useAdminStore, [
      "fetchProviders",
      "usersSearch",
      "banUser",
      "unbanUser",
    ]),
    ban(id) {
      this.banUser("provider", id);
    },
    unban(id) {
      this.unbanUser("provider", id);
    },
  },
  computed: {
    ...mapState(useAdminStore, ["result", "providers"]),
  },
  created() {
    this.fetchProviders();
  },
};
</script>
<style></style>
