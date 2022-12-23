<template>
  <div class="bg-primary drop-shadow-md">
    <div class="container">
      <div class="navbar">
        <div class="navbar-start">
          <RouterLink to="/" class="text-xl font-bold">MUNCH</RouterLink>
        </div>
        <div class="navbar-end">
          <RouterLink :to="{ name: 'login' }">
            <button class="btn btn-accent">LOGIN</button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style></style>
