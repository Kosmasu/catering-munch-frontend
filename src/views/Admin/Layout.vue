<template>
  <div class="flex w-full">
    <admin-navbar class="flex-none"/>
    <div class="flex-1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue';

export default {
  components: {
    AdminNavbar
  },
}
</script>

<style>

</style>