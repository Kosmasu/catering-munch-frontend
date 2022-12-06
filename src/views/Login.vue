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
          <form @submit.prevent="this.login" class="form-control">
            <!-- EMAIL -->
            <input-vue
              v-model="form.users_email"
              name="users_email"
              type="email"
              label="Email"
              :errors="this.errorData.errors"
            />
            <!-- PASSWORD -->
            <input-vue
              v-model="form.password"
              name="password"
              type="password"
              label="Password"
              :errors="this.errorData.errors"
            />
            <label v-if="this.errorData" class="label">
              <span class="label-text text-error">
                {{ this.errorData.message }}
              </span>
            </label>
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
import { mapState, mapActions, mapWritableState} from "pinia";
import { useLoginStore } from "@/stores/Auth/LoginStore.js";
import InputVue from "@/components/Inputs/Input.vue";

export default {
  name: "Login",
  components: {
    InputVue,
  },
  computed: {
    ...mapWritableState(useLoginStore, ["form"]),
    ...mapState(useLoginStore, ["errorData"]),
  },
  methods: {
    ...mapActions(useLoginStore, ["login"]),
  },
};
</script>

<style></style>
