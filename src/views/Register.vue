<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse w-full">
      <div class="text-center lg:text-left">
        <img
          src="@/assets/munch.png"
          alt=""
          class="hidden rounded-lg xl:block"
        />
        <h1 class="text-5xl font-bold">REGISTER</h1>
        <p class="text-lg py-6">Explore new home cookings through catering</p>
      </div>
      <div class="card flex-shrink w-full max-w-2xl shadow-2xl bg-base-100">
        <div class="card-body">
          <form @submit.prevent="register" class="form-control">
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
              v-model="confirm"
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
            <div class="form-control mt-4">
              <button class="btn btn-primary">Register</button>
            </div>
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
export default {
  data: function () {
    return {
      nama: "",
      email: "",
      alamat: "",
      telepon: "",
      password: "",
      confirm: "",
      role: "customer",
      tnc: "false",
    };
  },
  methods: {
    register() {
      console.log(this.nama);
      console.log(this.email);
      console.log(this.alamat);
      console.log(this.telepon);
      console.log(this.password);
      console.log(this.confirm);
      console.log(this.role);
      console.log(this.tnc);
    },
  },
};
</script>
<style></style>
