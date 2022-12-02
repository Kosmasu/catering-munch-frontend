<template>
  <div class="flex">
    <div class="flex-initial w-1/5">
      <navbar />
    </div>

    <div class="flex-1 container">
      <div class="border-solid border-2 rounded-md m-8 p-4">
        <div class="flex justify-between mb-8">
          <div class="text-3xl m-2">List of Provider</div>
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
              class="input input-bordered"
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
              <tr
                v-for="provider in usersSearch('provider', query)"
                class="hover"
              >
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
                    class="btn btn-primary rounded-lg"
                  >
                    Ban
                  </button>
                  <button
                    v-else
                    @click="unban(provider.users_id)"
                    class="btn btn-error rounded-lg"
                  >
                    Unban
                  </button>
                </td>
              </tr>
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
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useAdminStore } from "@/stores/AdminStore";
import Navbar from "@/components/AdminNavbar.vue";

export default {
  name: "AdminProviders",
  components: {
    Navbar,
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
    ...mapState(useAdminStore, ["status", "providers"]),
  },
  created() {
    this.fetchProviders();
  },
};
</script>
<style></style>
