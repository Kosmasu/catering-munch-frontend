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
            <input-vue
              v-model="form.users_email"
              name="users_email"
              type="email"
              label="Email"
              :errorMessages="this.errorMessages"
            />
            <!-- PASSWORD -->
            <input-vue
              v-model="form.password"
              name="password"
              type="password"
              label="Password"
              :errorMessages="this.errorMessages"
            />
            <!-- <label v-if="this.result" class="label">
              <span
              v-if="this.errorMessages['password']"
                class="label-text text-error"
              >
                Password is required!
              </span>
              <span
                v-else-if="this.result.status"
                class="label-text text-error"
              >
                Gagal Login! Cek kembali email / password!
              </span>
              <span v-else></span>
            </label> -->
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
import { useAuthStore } from "@/stores/AuthStore.js";
import InputVue from "@/components/Inputs/Input.vue";

export default {
  name: "Login",
  components: {
    InputVue
  },
  data() {
    return {
      form: {
        users_email: undefined,
        password: undefined,
      },
      errorMessages: undefined,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["result"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["login"]),
    async submit() {
      await this.login(this.email, this.password).then(response=>{
        console.log('response:',response);
        if (response instanceof Error) {
          this.errorMessages = response.response.data.errors  
          console.log('this.errorMessages:',this.errorMessages);
          console.log('this.errorMessages["users_email"]:',this.errorMessages["users_email"]);
          console.log('this.errorMessages["users_email"][0]:',this.errorMessages["users_email"][0]);
          if (this.errorMessages) {
            console.log("1");
            console.log('this.errorMessages:',this.errorMessages);
            console.log('Object.hasOwn(this.errorMessages, "users_email"):',Object.hasOwn(this.errorMessages, "users_email"));
            if (Object.hasOwn(this.errorMessages, 'users_email')) {
              console.log("2")
            }
          }
          if (this.errorMessages && Object.hasOwn(this.errorMessages, 'users_email')) {
            console.log("3");
          }
        }
      })
    },
  },
};
</script>

<style></style>
