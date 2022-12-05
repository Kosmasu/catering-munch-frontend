<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse w-full">
      <div class="flex flex-col items-center text-center lg:text-left">
        <img
          src="@/assets/munch.png"
          alt=""
          class="hidden rounded-lg xl:block py-4 w-96"
        />
        <p class="text-center text-lg py-2">
          Explore new home cookings through catering.
        </p>
      </div>
      <div class="card flex-shrink w-full max-w-xl shadow-2xl bg-base-100">
        <div class="card-body">
          <h1 class="text-4xl font-bold mb-4 text-primary">Register</h1>
          <form @submit.prevent="submit" class="form-control">
            <!-- NAMA -->
            <label class="label">
              <span class="label-text">Nama</span>
            </label>
            <input
              type="text"
              v-model="nama"
              placeholder="Nama"
              class="input input-bordered"
            />
            <!-- EMAIL -->
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              v-model="email"
              placeholder="Email"
              class="input input-bordered"
            />
            <!-- ALAMAT -->
            <label class="label">
              <span class="label-text">Alamat</span>
            </label>
            <input
              type="text"
              v-model="alamat"
              placeholder="Alamat"
              class="input input-bordered"
            />
            <!-- TELEPON -->
            <label class="label">
              <span class="label-text">Nomor Telepon</span>
            </label>
            <input
              type="text"
              v-model="telepon"
              placeholder="Nomor Telepon"
              class="input input-bordered"
            />
            <!-- PASSWORD -->
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              class="input input-bordered"
            />
            <!-- CONFIRM PASSWORD -->
            <label class="label">
              <span class="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              v-model="password_confirmation"
              placeholder="Confirm Password"
              class="input input-bordered"
            />
            <!-- ROLE -->
            <div class="flex justify-center space-x-12 mt-2">
              <label class="label cursor-pointer space-x-2">
                <input
                  type="radio"
                  v-model="role"
                  value="customer"
                  class="radio"
                />
                <span class="label-text">Customer</span>
              </label>
              <label class="label cursor-pointer space-x-2">
                <input
                  type="radio"
                  v-model="role"
                  value="provider"
                  class="radio"
                />
                <span class="label-text">Provider</span>
              </label>
            </div>
            <!-- T&C -->
            <label class="flex justify-start space-x-4 label cursor-pointer">
              <input type="checkbox" v-model="tnc" class="checkbox-primary" />
              <span>
                I agree to the
                <a href="#" class="link link-hover text-primary-focus">
                  Terms &amp; Conditions
                </a>
              </span>
            </label>
            <button class="btn btn-primary w-full mt-4">Register</button>
          </form>
          <div>
            Already have an account?
            <a href="/login" class="link link-hover text-primary-focus">
              Login Now!
            </a>
          </div>
          <label class="label">
            <a href="/" class="link link-hover text-secondary-focus">
              &lt; Back to Home
            </a>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "@/stores/AuthStore.js";

export default {
  name: "Register",
  components: {},
  data() {
    return {
      nama: "",
      email: "",
      alamat: "",
      telepon: "",
      password: "",
      password_confirmation: "",
      role: "customer",
      tnc: "false",
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["register"]),
    submit() {
      this.register(
        this.nama,
        this.email,
        this.alamat,
        this.telepon,
        this.password,
        this.password_confirmation,
        this.role,
        this.tnc
      );
    },
  },
  computed: {
    ...mapState(useAuthStore, ["result"]),
  },
};
</script>
<style></style>
