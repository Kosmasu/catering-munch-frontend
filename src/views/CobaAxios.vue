<template>
  <div class="p-8">
    <h1 class="text-3xl">Customers:</h1>
    <div v-if="this.customers">
      <pre> 
        {{ this.customers }}
      </pre>
    </div>
    <font-awesome-icon v-else icon="fa-solid fa-spinner" class="text-6xl animate-spin"/>
    <h1 class="text-3xl">Providers:</h1>
    <div v-if="this.providers">
      <pre> 
        {{ this.providers }}
      </pre>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useAdminStore } from '@/stores/AdminStore'

export default {
  name: "CobaAxios",
  data() {
    return {

    }
  },
  methods: {
    ...mapActions(useAdminStore, ['fetchCustomers'])
  },
  computed: {
    ...mapState(useAdminStore, ['customers', 'providers'])
  },
  created() {
    this.fetchCustomers();
  }
}
</script>

<style>

</style>