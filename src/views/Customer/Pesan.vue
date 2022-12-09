<template>
  <div class="container">
    <div class="m-4 font-semibold text-2xl text-center">Pesan Menu</div>
    <div class="rounded-lg border-2 p-4">
      <div class="font-semibold text-xl">List Menu</div>
      <div>
        <div v-for="menu in menus">
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
      <!-- <span>Every</span>
      <select @change="onChange(this.value)" v-model="dayOfWeek">
        <option v-for="day in daysOfWeek" v-bind:value="day.id">
          {{ day.name }}
        </option>
      </select> -->
      <v-calendar :attributes="attributes" @dayclick="onDayClick" />
      <div>{{ days }}</div>

      <div>
        <button @click="submit" class="btn btn-primary">Submit</button>
      </div>
    </div>
    <div class="rounded-lg border-2 p-4">
      <div class="font-semibold text-xl">List Pemesanan</div>
      <div class="font-semibold text-lg">Detail</div>
      <div v-for="(order, index) in orders" :key="index">
        <div class="font-semibold">
          {{ order.day.id }}
        </div>
        <div v-for="(menu, index) in order.order" :key="index">
          &emsp; {{ menu.menu_id }} - {{ menu.menu_nama }}
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
import { mapActions, mapWritableState } from "pinia";
import { useCustomerStore } from "@/stores/CustomerStore.js";
import InputVue from "@/components/Inputs/Input.vue";

export default {
  name: "CustomerPesan",
  components: {},
  data() {
    return {
      menus: [
        { menu_id: 1, menu_nama: "Pizza" },
        { menu_id: 2, menu_nama: "Mixue" },
        { menu_id: 3, menu_nama: "Burger" },
        { menu_id: 4, menu_nama: "Ayam Goreng" },
        { menu_id: 5, menu_nama: "Ayam Geprek" },
      ],
      // daysOfWeek: [
      //   { id: 1, name: "Sunday" },
      //   { id: 2, name: "Monday" },
      //   { id: 3, name: "Tuesday" },
      //   { id: 4, name: "Wednesday" },
      //   { id: 5, name: "Thursday" },
      //   { id: 6, name: "Friday" },
      //   { id: 7, name: "Saturday" },
      // ],
      // dayOfWeek: "",
      selectedMenus: [],
      orders: [],

      days: [],
    };
  },
  computed: {
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
  methods: {
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
};
</script>
<style></style>
