<template>
  <navbar />
  <table>
    <thead></thead>
    <tbody>
      <div>
        <div v-if="a % 2 == 0">
          Hello Genap
        </div>
        <div v-else>
          Hello Ganjil
        </div>
      </div>

      <tr v-for="(item, index) in items" :key="index">
        <td>{{ item }}</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Navbar from "@/components/AdminNavbar.vue";
export default {
  name: "AdminHome",
  data() {
    return {
      a: 1,
    };
  },
  components: {
    Navbar,
  },
};
</script>

<style></style>
