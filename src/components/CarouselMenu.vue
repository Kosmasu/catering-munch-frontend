<template>
  <div class="carousel rounded-box space-x-4">
    <card-menu-vue class="carousel-item" v-for="(item, index) in providers" :key="index" :provider="item" />
  </div>
</template>

<script>
import CardMenuVue from '@/components/CardMenu.vue';
export default {
  name: "CardMenu",
  components: {
    CardMenuVue,
  },
  data() {
    return {
      providers: [
        {
          users_nama: "Provider",
          users_alamat: "Alamat",
          users_rating: "4.5",
        },
        { 
          users_nama: "Provider",
          users_alamat: "Alamat",
          users_rating: "4.5",
        },
        { 
          users_nama: "Provider",
          users_alamat: "Alamat",
          users_rating: "4.5",
        },
        { 
          users_nama: "Provider",
          users_alamat: "Alamat",
          users_rating: "4.5",
        },
        { 
          users_nama: "Provider",
          users_alamat: "Alamat",
          users_rating: "4.5",
        },
        { 
          users_nama: "Provider",
          users_alamat: "Alamat",
          users_rating: "4.5",
        },
        { 
          users_nama: "Provider",
          users_alamat: "Alamat",
          users_rating: "4.5",
        },
      ]
    }
  },
  props: {
    // providers: {
    //   required: true,
    //   type: Array
    // },
  },
}
</script>

<style>

</style>