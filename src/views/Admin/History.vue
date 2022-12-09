<template>
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
            <th class="bg-primary">ID</th>
            <th class="bg-primary">Action</th>
            <th class="bg-primary">Detail</th>
            <th class="bg-primary">Waktu</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in historyLog">
            <td>{{ log.log_id }}</td>
            <td>{{ log.log_title }}</td>
            <td>{{ log.log_desc }}</td>
            <td>{{ log.log_datetime }}</td>
          </tr>
          <tr v-if="!historyLog || historyLog.length == 0">
            <td colspan="4" class="text-lg font-semibold text-center">
              Kosong...
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

export default {
  name: "AdminHistory",
  components: {
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() { },
};
</script>
<style>

</style>
