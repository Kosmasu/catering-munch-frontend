<template>
  <div class="container">
    <div class="m-6 font-semibold text-3xl text-center">Pesan</div>
    <div v-if="menus" class="grid grid-cols-2 gap-8 rounded-lg border-2 p-4">
      <div>
        <div class="font-semibold text-xl">Pilih Tanggal</div>
        <v-calendar :attributes="attributes" @dayclick="onDayClick" />
        <div>{{ days }}</div>
      </div>

      <div>
        <div class="font-semibold text-xl">Pilih Menu</div>
        <div class="grid grid-cols-4 gap-4">
          <div v-for="menu in menus.data">
            <label class="label cursor-pointer justify-start">
              <input
                type="checkbox"
                v-model="selectedMenus"
                v-bind:value="menu"
                class="checkbox"
              />
              <span class="label">{{ menu.menu_nama }}</span>
            </label>
          </div>
        </div>
        <div>
          <button @click="submit" class="btn btn-primary">Submit</button>
        </div>
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
      <div class="font-semibold text-xl">List Pemesanan</div>
      <div class="font-semibold text-lg">Detail</div>
      <div v-for="(order, index) in orders" :key="index">
        <div class="font-semibold">
          {{ order.day.id }}
        </div>
        <div v-for="(menu, index) in order.order" :key="index">
          &emsp; {{ menu.menu_id }} - {{ menu.menu_nama }} -
          {{ menu.menu_harga }}
        </div>
      </div>
      <div class="font-semibold text-lg">Summary</div>
      <div>Jumlah : {{ orders.length }}</div>
      <div>Total : Rp. 0,00</div>
      <div>
        <button class="btn btn-primary">Proceed to Checkout</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useCustomerStore } from "@/stores/CustomerStore.js";
import InputVue from "@/components/Inputs/Input.vue";
import router from "@/router";

export default {
  name: "CustomerPesan",
  components: {},
  data() {
    return {
      provider_id: undefined,
      selectedMenus: [],
      orders: [],

      days: [],
    };
  },
  methods: {
    ...mapActions(useCustomerStore, ["fetchProviderMenus"]),
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
    submit() {
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
      console.log(this.orders);
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
    this.provider_id = this.$route.params.id;
    this.fetchProviderMenus(this.provider_id);
  },
  watch: {},
};
</script>
<style></style>
