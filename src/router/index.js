import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import AdminHome from "../views/Admin/Home.vue";
import AdminCustomers from "../views/Admin/Customers.vue";
import AdminProviders from "../views/Admin/Providers.vue";
import AdminHistory from "../views/Admin/History.vue";
import ProviderHome from "../views/Provider/Home.vue";
import CustomerHome from "../views/Customer/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing-page",
      component: LandingPage,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminHome,
    },
    {
      path: "/admin/customers",
      name: "admin-customers",
      component: AdminCustomers,
    },
    {
      path: "/admin/providers",
      name: "admin-providers",
      component: AdminProviders,
    },
    {
      path: "/admin/history",
      name: "admin-history",
      component: AdminHistory,
    },
    {
      path: "/provider",
      name: "provider",
      component: ProviderHome,
    },
    {
      path: "/customer",
      name: "customer",
      component: CustomerHome,
    },
  ],
});

export default router;
