<template>
  <navbar />
  <div class="border-solid border-2 rounded-md m-8 p-4">
    <div class="flex justify-between mb-8">
      <div class="text-3xl">List of Provider</div>
      <div class="flex space-x-8">
        <div>
          <div>Showing :</div>
          <div v-if="providerList.length <= 1">
            {{ providerList.length }} Provider
          </div>
          <div v-else>{{ providerList.length }} Providers</div>
        </div>
        <form class="form-control">
          <div class="input-group">
            <input
              type="text"
              v-model="query"
              placeholder="Search…"
              class="input input-bordered"
            />
            <!-- <button class="btn btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button> -->
          </div>
        </form>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="table table-compact w-full text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Alamat</th>
            <th>Nomor Telepon</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-if="providerList.length > 0">
          <tr v-for="provider in providerSearch" class="hover">
            <td>{{ provider.id }}</td>
            <td>{{ provider.nama }}</td>
            <td>{{ provider.email }}</td>
            <td>{{ provider.alamat }}</td>
            <td>{{ provider.telepon }}</td>
            <td>{{ provider.status }}</td>
            <td>
              <form @submit.prevent="submit" class="form-control">
                <button
                  @click.prevent="ban(provider.id)"
                  class="btn btn-error rounded-lg"
                >
                  Ban
                </button>
              </form>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="text-center" colspan="7">
              Tidak ada provider saat ini!
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/AdminNavbar.vue";
export default {
  name: "AdminProviders",
  components: {
    Navbar,
  },
  data() {
    return {
      query: "",
      providerList: [
        {
          id: 3,
          nama: "Provider1",
          email: "Provider1@gmail.com",
          alamat: "Surabaya",
          telepon: "0812345678",
          status: "Aktif",
        },
      ],
    };
  },
  computed: {
    providerSearch() {
      return this.providerList.filter((provider) => {
        return provider.nama.indexOf(this.query) > -1;
      });
    },
  },
  methods: {
    submit(id) {
      console.log(this.providerList.find((provider) => provider.id == id));
    },
    ban(id) {
      this.submit(id);
    },
  },
};
</script>
<style></style>
