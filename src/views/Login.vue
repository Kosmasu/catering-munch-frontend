<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse w-full">
      <div class="flex flex-col items-center text-center lg:text-left">
        <img
          src="@/assets/munch.png"
          alt=""
          class="hidden rounded-lg lg:block py-4 w-96"
        />
        <p class="text-center text-lg py-2">
          Enjoy the vast selection of catering service.
        </p>
      </div>
      <div class="card flex-shrink w-full max-w-xl shadow-2xl bg-base-100">
        <div class="card-body">
          <h1 class="text-4xl font-bold mb-4 text-primary">Login</h1>
          <form @submit.prevent="submit" class="form-control">
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
            <button class="btn btn-primary mt-4">Login</button>
          </form>
          <div>
            Don't have an account?
            <a href="/register" class="link link-hover text-primary">
              Register Now!
            </a>
          </div>
          <label class="label">
            <a href="/" class="link link-hover text-error">
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
import { useLoginRegisterStore } from "@/stores/LoginRegisterStore";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(useLoginRegisterStore, ["login"]),
    submit() {
      this.login(this.email, this.password);
    },
  },
  computed: {
    ...mapState(useLoginRegisterStore, ["result"]),
  },
};
</script>

<style></style>
