<template>
  <div class="container">
    <div
      v-if="carts"
      v-for="(cart, index) in carts"
      :key="index"
      class="rounded-lg border-2 p-4 m-8"
    >
      <div class="font-semibold text-xl">{{ cart.users_nama }}</div>
      <table class="table table-compact text-center w-full">
        <tbody>
          <tr v-for="(item, index) in cart.cart_provider" :key="index">
            <td>{{ index + 1 }}</td>
            <td></td>
            <td>{{ item.cart_jumlah }}</td>
            <td>Rp. {{ item.cart_total.toLocaleString("id-ID") }},00</td>
            <td>{{ formatDate(new Date(item.cart_tanggal)) }}</td>
            <td>
              <button
                @click="deleteFromCart(item.cart_id)"
                class="btn btn-sm btn-error"
              >
                X
              </button>
            </td>
          </tr>
          <tr>
            <td colspan="7">
              <div class="flex flex-col">
                <div>Total: Rp.0</div>
                <div>Jumlah Pesanan: 0</div>
                <button class="btn btn-primary w-56 self-end">Pesan</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="m-12 text-center">
      <font-awesome-icon
        icon="fa-solid fa-spinner"
        class="text-6xl animate-spin"
      />
    </div>
    <div
      v-if="carts && carts.length == 0"
      class="m-12 font-semibold text-3xl text-center"
    >
      Cart Kosong!
    </div>
    <button @click="clearCart" class="btn btn-primary w-full">
      Clear Cart
    </button>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useCustomerStore } from "../../stores/CustomerStore";

export default {
  name: "CustomerCart",
  methods: {
    ...mapActions(useCustomerStore, [
      "fetchCart",
      "deleteCart",
      "clearCart",
      "checkoutCart",
    ]),
    deleteFromCart(cart_id) {
      this.deleteCart(cart_id);
    },
    pesan() {},
    formatDate(date) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    },
  },
  computed: {
    ...mapState(useCustomerStore, ["carts"]),
  },
  created() {
    const fetchInterval = setInterval(() => {
      let oldCart = this.carts;
      this.fetchCart().then((response) => {
        if (oldCart && this.carts.length === oldCart.length) {
          clearInterval(fetchInterval);
        }
      });
    }, 3000);
  },
};
</script>
<style></style>
