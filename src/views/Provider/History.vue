<template>
  <div class="container">
    <div class="border-solid border-2 rounded-lg p-4 my-4">
      <div class="flex justify-between mb-8">
        <div class="text-3xl m-2">History Pemesanan</div>
        <div class="flex space-x-8 items-center">
          <div>
            <select-batch-size @on-batch-size-change="this.fetchHistory()" />
          </div>
          <input
            type="text"
            v-model="this.query"
            placeholder="Search..."
            class="input input-bordered"
          />
        </div>
      </div>
      <table class="table table-compact w-full text-center">
        <thead>
          <tr>
            <th class="bg-primary">ID</th>
            <th class="bg-primary">Jumlah</th>
            <th class="bg-primary">Total</th>
            <th class="bg-primary">Rating</th>
            <th class="bg-primary">Status</th>
            <th class="bg-primary">Customer</th>
            <th class="bg-primary">Tanggal</th>
          </tr>
        </thead>
        <tbody v-if="histories">
          <tr
            v-for="(history, index) in this.histories.data"
            :key="index"
            class="hover"
          >
            <td>{{ history.pemesanan_id }}</td>
            <td>{{ history.pemesanan_jumlah }}</td>
            <td>
              Rp. {{ history.pemesanan_total.toLocaleString("id-ID") }},00
            </td>
            <td>{{ history.pemesanan_rating }}</td>
            <td class="capitalize">{{ history.pemesanan_status }}</td>
            <td>{{ history.users_customer }}</td>
            <td>
              {{ new Date(history.created_at).toLocaleDateString("id-ID") }}
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="text-center" colspan="5">
              <font-awesome-icon
                icon="fa-solid fa-spinner"
                class="text-6xl animate-spin"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="histories" class="p-2">
        <pagination-vue v-model="currentPage" :paginatedData="histories" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useProviderStore } from "@/stores/ProviderStore";
import PaginationVue from "@/components/Pagination.vue";
import SelectBatchSize from "@/components/SelectBatchSize.vue";

export default {
  name: "ProviderHistory",
  components: {
    PaginationVue,
    SelectBatchSize,
  },
  data() {
    return {
      query: "",
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions(useProviderStore, ["fetchHistory"]),
  },
  computed: {
    ...mapState(useProviderStore, ["histories"]),
  },
  created() {
    this.fetchHistory().then((response) => {
      console.log("this.histories", this.histories);
    });
  },
};
</script>
<style></style>
