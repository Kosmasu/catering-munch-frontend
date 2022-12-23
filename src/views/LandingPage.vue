<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col">
      <img src="@/assets/munch.png" class="max-w-md lg:max-w-2xl" />
      <RouterLink :to="{ name: 'login' }">
        <button class="btn btn-primary">Get Started</button>
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
