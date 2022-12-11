<template>
  <div class="container space-y-4 mt-4">
    <div class="font-semibold text-2xl">Catering Anda</div>
    <div class="flex gap-2">
      <carousel-menu-vue :providers="null"/>
    </div>
    <div class="font-semibold text-2xl">Top Catering</div>
    <div class="flex gap-2">
      <div class="card w-1/5 h-60 bg-primary"></div>
      <div class="card w-1/5 h-60 bg-primary"></div>
      <div class="card w-1/5 h-60 bg-primary"></div>
      <div class="card w-1/5 h-60 bg-primary"></div>
      <div class="card w-1/5 h-60 bg-primary"></div>
    </div>
    <div class="font-semibold text-2xl">Pesan Lagi</div>
    <div class="flex gap-2">
      <div class="card w-1/5 h-60 bg-primary"></div>
      <div class="card w-1/5 h-60 bg-primary"></div>
      <div class="card w-1/5 h-60 bg-primary"></div>
      <div class="card w-1/5 h-60 bg-primary"></div>
      <div class="card w-1/5 h-60 bg-primary"></div>
    </div>
  </div>
</template>
<script>
import CardMenuVue from '@/components/CardMenu.vue';
import CarouselMenuVue from '@/components/CarouselMenu.vue';

export default {
  name: "CustomerHome",
  components: {
    CarouselMenuVue,
    CardMenuVue,
  },
  data() {
    return {};
  },
  methods: {
    
  },
};
</script>
<style>

</style>
