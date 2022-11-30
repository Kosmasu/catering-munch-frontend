<template>
  <navbar />
  <div class="border-solid border-2 rounded-md m-8 p-4">
    <div class="text-3xl">Overview</div>
    <div class="text-stone-400">Monthly Review</div>
    <div class="divider" />
    <div class="grid grid-cols-3 gap-4 mb-8 text-center text-xl">
      <div class="border-solid border-2 rounded-md py-4">
        <div class="font-bold">Current Customer</div>
        <div>{{ currentCustomer }}</div>
      </div>
      <div class="border-solid border-2 rounded-md py-4">
        <div class="font-bold">Total Pendapatan</div>
        <div>Rp. {{ totalPendapatan.toLocaleString("id-ID") }},00</div>
      </div>
      <div class="border-solid border-2 rounded-md py-4">
        <div class="font-bold">Made Deliveries</div>
        <div>{{ madeDeliveries }}</div>
      </div>
    </div>
    <div class="text-2xl">New Notification</div>
    <div class="overflow-x-auto mb-8">
      <table class="table table-compact w-full text-center">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Nomor Telepon</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-if="newNotification.length >= 1">
          <tr
            v-for="(notification, index) in newNotification"
            :key="index"
            class="hover"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ notification.users_nama }}</td>
            <td>{{ notification.users_alamat }}</td>
            <td>{{ notification.users_telepon }}</td>
            <td>
              <form
                @submit.prevent="order(id)"
                class="flex justify-center space-x-4"
              >
                <button
                  @click.prevent="order(notification.id)"
                  class="btn btn-ghost rounded-lg"
                >
                  Detail
                </button>
                <!-- <RouterLink to="/provider/order/detail">
                  <button class="btn btn-ghost rounded-lg">Detail</button>
                </RouterLink> -->
                <button
                  @click.prevent="acceptOrder(notification.id)"
                  class="btn btn-success rounded-lg"
                >
                  Accept
                </button>
                <button
                  @click.prevent="declineOrder(notification.id)"
                  class="btn btn-error rounded-lg"
                >
                  Decline
                </button>
              </form>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="5">Tidak ada notifikasi saat ini!</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-2xl">This Month's Delivery</div>
    <div class="overflow-x-auto">
      <table class="table table-compact w-full text-center">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Nomor Telepon</th>
            <th>Tanggal</th>
            <th>Delivery Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-if="deliveries.length > 0">
          <tr
            v-for="(delivery, index) in deliveries"
            :key="index"
            class="hover"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ delivery.users_nama }}</td>
            <td>{{ delivery.users_alamat }}</td>
            <td>{{ delivery.users_telepon }}</td>
            <td>{{ delivery.tanggal }}</td>
            <td>{{ delivery.status }}</td>
            <td>
              <form
                @submit.prevent="submit(id)"
                class="flex justify-center space-x-4"
              >
                <button
                  @click.prevent="deliver(delivery.id)"
                  class="btn btn-info rounded-lg"
                >
                  Deliver
                </button>
              </form>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="7">Tidak ada delivery saat ini!</td>
          </tr>
        </tbody>
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
  data() {
    return {
      currentCustomer: 1,
      totalPendapatan: 250000,
      madeDeliveries: 3,
      newNotification: [
        {
          id: 2,
          users_nama: "Customer2",
          users_alamat: "Surabaya",
          users_telepon: "0812345678",
        },
      ],
      deliveries: [
        {
          id: 1,
          users_nama: "Customer1",
          users_alamat: "Surabaya",
          users_telepon: "0812345678",
          tanggal: "2022-11-30",
          status: "Belum Diterima",
        },
      ],
    };
  },
  methods: {
    order(id, state = "detail") {
      console.log(
        this.newNotification.find((notification) => notification.id == id)
      );
      console.log(state);
    },
    acceptOrder(id) {
      this.order(id, "accept");
    },
    declineOrder(id) {
      this.order(id, "decline");
    },
    submit(id) {
      console.log(this.deliveries.find((delivery) => delivery.id == id));
    },
    deliver(id) {
      this.submit(id);
    },
  },
};
</script>
<style></style>
