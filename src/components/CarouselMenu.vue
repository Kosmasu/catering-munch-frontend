<template>
  <div class="flex overflow-x-auto rounded-box space-x-4">
    <card-menu-vue
      v-if="type == 'objek'"
      class="carousel-item"
      v-for="(item, index) in providers"
      :key="index"
      :provider="item.users_provider"
    />
    <card-menu-vue
      v-else-if="type != 'objek'"
      class="carousel-item"
      v-for="(item, key) in providers"
      :key="key"
      :provider="item"
    />
  </div>
</template>

<script>
import CardMenuVue from "@/components/CardMenu.vue";
export default {
  name: "CardMenu",
  components: {
    CardMenuVue,
  },
  props: {
    providers: {
      type: Object,
    },
    type: {
      type: String,
    },
  },
};
</script>

<style></style>
