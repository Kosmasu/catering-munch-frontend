<template>
  <div class="card card-compact w-80 bg-base-100 hover:bg-base-200 hover:cursor-pointer">
    <img src="@/assets/chicken.jpg" class="rounded-xl" draggable="false" />
    <div class="card-body">
      <h2 class="card-title">{{ provider.users_nama }}</h2>
      <p>{{ provider.users_alamat }}</p>
      <div class="flex items-center">
        <div class="flex items-center gap-1">
          <font-awesome-icon icon="fa-solid fa-star" class="text-2xl text-yellow" />
          <span class="font-semibold">{{ provider.users_rating }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardMenu",
  props: {
    provider: {
      required: true,
      type: Object
    }
  }
}
</script>

<style>

</style>