<template>
  <navbar />
  <div class="border-solid border-2 rounded-md m-8 p-4">
    <div class="text-3xl">Summary</div>
    <div class="text-stone-400">Monthly Review</div>
    <div class="divider" />
    <div class="grid grid-cols-3 gap-4 mb-8 text-center text-xl">
      <div class="border-solid border-2 rounded-md py-4">
        <div>{{ currentCustomer }}</div>
        <div class="font-bold">Current Customer</div>
      </div>
      <div class="border-solid border-2 rounded-md py-4">
        <div>{{ totalOrders }}</div>
        <div class="font-bold">Total Orders</div>
      </div>
      <div class="border-solid border-2 rounded-md py-4">
        <div>{{ madeDeliveries }}</div>
        <div class="font-bold">Made Deliveries</div>
      </div>
    </div>
    <div class="text-2xl">New Notification</div>
    <div class="overflow-x-auto">
      <table class="table table-compact w-full text-center">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Delivery Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
    <div class="text-2xl">This Month's Delivery</div>
    <div class="overflow-x-auto">
      <table class="table table-compact w-full text-center">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Delivery Status</th>
            <th>Delivery Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/ProviderNavbar.vue";
export default {
  name: "ProviderHome",
  components: {
    Navbar,
  },
  data() {},
  methods: {},
};
</script>
<style></style>
