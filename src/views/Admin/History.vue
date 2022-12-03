<template>
  <admin-layout>
    <div class="flex-1 container">
      <div class="border-solid border-2 rounded-md m-8 p-4">
        <div class="flex justify-between mb-8">
          <div class="text-3xl">Admin Log History</div>
          <div class="flex space-x-8">
            <div>
              <label class="label">
                <span class="label-text">History Filter</span>
              </label>
              <select class="select select-bordered w-full max-w-md">
                <option>History Log</option>
                <option>History Pemesanan</option>
                <option>History Topup</option>
                <option>History Menu</option>
                <option>History Rating</option>
              </select>
            </div>
            <div>
              <label class="label">
                <span class="label-text">Date Filter</span>
              </label>
              <select class="select select-bordered w-full max-w-md">
                <option selected>Show All</option>
              </select>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="table table-compact w-full text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Action</th>
                <th>Detail</th>
                <th>Waktu</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="log in historyLog">
                <td>{{ log.log_id }}</td>
                <td>{{ log.log_title }}</td>
                <td>{{ log.log_desc }}</td>
                <td>{{ log.log_datetime }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </admin-layout>
</template>
<script>
import AdminLayout from "@/views/Admin/Layout.vue";
export default {
  name: "AdminHistory",
  components: {
    AdminLayout,
  },
  data() {
    return {
      historyLog: [
        {
          log_id: 1,
          log_title: "Admin melakukan banned terhadap Customer1",
          log_desc: "Customer1 melakukan pelanggaran terhadap aturan!",
          log_datetime: "2022-11-29 08:00:00",
          users_id: "1",
        },
        {
          log_id: 2,
          log_title: "Admin melakukan unban terhadap Customer1",
          log_desc: "Akun Customer1 sudah aktif kembali!",
          log_datetime: "2022-11-29 08:05:00",
          users_id: "1",
        },
      ],
      historyPemesanan: [],
      historyTopup: [],
      historyMenu: [],
      historyRating: [],
    };
  },
  computed: {},
  methods: {},
};
</script>
<style></style>
