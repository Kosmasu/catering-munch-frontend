<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse w-full">
      <div class="text-center lg:text-left">
        <img
          src="@/assets/munch.png"
          alt=""
          class="hidden rounded-lg xl:block"
        />
        <h1 class="text-5xl font-bold">LOGIN</h1>
        <p class="text-lg py-6">Enjoy the vast selection of catering service</p>
      </div>
      <div class="card flex-shrink w-full max-w-lg shadow-2xl bg-base-100">
        <div class="card-body">
          <form @submit.prevent="login" class="form-control">
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
            <div class="form-control mt-6">
              <button class="btn btn-primary">Login</button>
            </div>
          </form>
          <div>
            Don't have an account?
            <a href="/register" class="link link-hover text-primary">
              Register Now!
            </a>
          </div>
          <label class="label">
            <a href="/" class="link link-hover text-secondary">
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
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log(this.email);
      console.log(this.password);
    },
  },
};
</script>

<style></style>
