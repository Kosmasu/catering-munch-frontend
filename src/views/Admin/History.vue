<template>
  <admin-layout>
    <div class="border-solid border-2 rounded-lg m-12 p-4">
      <div class="flex justify-between mb-8">
        <div class="text-3xl m-2">Admin Log History</div>
        <div class="flex space-x-8">
          <div>
            <label class="label">
              <span class="label-text">History Filter</span>
            </label>
            <select class="select select-primary select-bordered w-full max-w-md">
              <option>Log</option>
              <option>Menu</option>
              <option>Pemesanan</option>
              <option>Rating</option>
              <option>Topup</option>
            </select>
          </div>
          <div>
            <label class="label">
              <span class="label-text">Date Filter</span>
            </label>
            <select class="select select-primary select-bordered w-full max-w-md">
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
  </admin-layout>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useAdminStore } from "@/stores/AdminStore";
import AdminLayout from "@/views/Admin/Layout.vue";

export default {
  name: "AdminHistory",
  components: {
    AdminLayout,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
};
</script>
<style></style>
