<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <!-- <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="MUNCH" />

      <nav>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/admin">Admin</RouterLink>
        <RouterLink to="/provider">Provider</RouterLink>
        <RouterLink to="/customer">Customer</RouterLink>
      </nav>
    </div>
  </header> -->

  <RouterView />
</template>
