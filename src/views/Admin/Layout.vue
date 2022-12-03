<template>
  <div class="flex w-full">
    <admin-navbar class="flex-none"/>
    <div class="flex-1">
      <slot>
      </slot>
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