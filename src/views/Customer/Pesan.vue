<template>
  <div class="container">
    <div class="m-6 font-semibold text-3xl text-center">Pesan</div>
    <div
      v-if="menus"
      class="grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-lg border-2 p-4"
    >
      <div class="text-center">
        <div class="font-semibold text-xl">Pilih Tanggal</div>
        <v-calendar
          :min-date="new Date()"
          :attributes="attributes"
          @dayclick="onDayClick"
        />
        <!-- <div>{{ days }}</div> -->
      </div>

      <div>
        <div class="font-semibold text-xl text-center">Pilih Menu</div>
        <div class="grid grid-cols-2 justify-items-center">
          <div v-for="menu in menus.data">
            <label class="label cursor-pointer justify-start">
              <input
                type="checkbox"
                v-model="selectedMenus"
                v-bind:value="menu"
                class="checkbox"
              />
              <span class="label whitespace-normal"
                >{{ menu.menu_nama }} - Rp.
                {{ menu.menu_harga.toLocaleString("id-ID") }},00</span
              >
            </label>
          </div>
        </div>
        <button @click="tambah" class="btn btn-primary w-full mt-4">
          Tambah
        </button>
      </div>

      <!-- <span>Every</span>
      <select @change="onChange(this.value)" v-model="dayOfWeek">
        <option v-for="day in daysOfWeek" v-bind:value="day.id">
          {{ day.name }}
        </option>
      </select> -->
    </div>
    <div v-else class="m-12 text-center">
      <font-awesome-icon
        icon="fa-solid fa-spinner"
        class="text-6xl animate-spin"
      />
    </div>
    <div class="mt-4 rounded-lg border-2 p-4">
      <div class="font-semibold text-xl text-center">Detail Pemesanan</div>
      <div class="grid grid-cols-3">
        <div v-for="(order, index) in orders" :key="index">
          <div class="font-semibold">
            <button @click="hapus(index)" class="btn btn-sm btn-primary">
              X
            </button>
            {{ order.day.id }}
          </div>
          <div v-for="(menu, key) in order.order" :key="key">
            &emsp; *{{ menu.menu_nama }} - Rp.
            {{ menu.menu_harga.toLocaleString("id-ID") }},00
          </div>
        </div>
      </div>
      <div class="font-semibold text-lg">Summary</div>
      <div>Jumlah : {{ orders.length }} hari</div>
      <div>Total : Rp. {{ total.toLocaleString("id-ID") }},00</div>
      <div>
        <button @click="addToCart" class="btn btn-primary">
          Proceed to Cart
        </button>
        <font-awesome-icon
          v-if="isLoading"
          icon="fa-solid fa-spinner"
          class="text-3xl animate-spin"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useCustomerStore } from "@/stores/CustomerStore.js";
import router from "@/router";

export default {
  name: "CustomerPesan",
  components: {},
  data() {
    return {
      selectedMenus: [],
      orders: [],
      total: 0,

      days: [],

      isLoading: false,
    };
  },
  methods: {
    ...mapActions(useCustomerStore, ["fetchProviderMenus", "addCart"]),
    onDayClick(day) {
      const idx = this.days.findIndex((d) => d.id === day.id);
      if (idx >= 0) {
        this.days.splice(idx, 1);
      } else {
        this.days.push({
          id: day.id,
          date: day.date,
        });
      }
    },
    onChange() {
      console.log(this.dayOfWeek);
      // this.days.push({ weekdays: [this.dayOfWeek] });
    },
    hapus(index) {
      this.orders.splice(index, 1);
    },
    tambah() {
      this.days.forEach((day) => {
        const idx = this.orders.findIndex((o) => o.day.id === day.id);
        if (idx >= 0) {
          // DELETE
          this.orders.splice(idx, 1);
        }

        this.orders.push({
          day,
          order: this.selectedMenus.sort((a, b) =>
            a.menu_id > b.menu_id ? 1 : b.menu_id > a.menu_id ? -1 : 0
          ),
        });
      });
      this.orders.sort((a, b) =>
        a.day.id > b.day.id ? 1 : b.day.id > a.day.id ? -1 : 0
      );
      this.total = 0;
      this.orders.forEach((order) => {
        this.total += order.order[0].menu_harga;
      });
      this.selectedMenus = [];
      this.days = [];
    },
    addToCart() {
      if (this.orders.length > 0) {
        this.isLoading = true;
        this.orders.forEach((order) => {
          order.order.forEach((o) => {
            this.addCart(o.menu_id, order.day.id);
          });
        });
        router.push({ name: "customer-cart" });
      }
    },
  },
  computed: {
    ...mapState(useCustomerStore, ["menus"]),
    dates() {
      return this.days.map((day) => day.date);
    },
    attributes() {
      return this.dates.map((date) => ({
        highlight: true,
        dates: date,
      }));
    },
  },
  created() {
    this.fetchProviderMenus(this.$route.params.id);
  },
  watch: {},
};
</script>
<style></style>
