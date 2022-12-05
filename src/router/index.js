import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

import AdminLayout from "../views/Admin/Layout.vue";
import AdminHome from "../views/Admin/Home.vue";
import AdminCustomers from "../views/Admin/Customers.vue";
import AdminProviders from "../views/Admin/Providers.vue";
import AdminHistory from "../views/Admin/History.vue";

import ProviderLayout from "../views/Provider/Layout.vue";
import ProviderHome from "../views/Provider/Home.vue";
import ProviderMenus from "../views/Provider/Menus.vue";
import ProviderMenusDetail from "../views/Provider/MenusDetail.vue";
import ProviderMenusAdd from "../views/Provider/MenusAdd.vue";
import ProviderMenusEdit from "../views/Provider/MenusEdit.vue";
import ProviderHistory from "../views/Provider/History.vue";

import CustomerLayout from "../views/Customer/Layout.vue";
import CustomerHome from "../views/Customer/Home.vue";
import CustomerSearch from "../views/Customer/Search.vue";
import CustomerHistory from "../views/Customer/History.vue";
import CustomerDetailHistory from "../views/Customer/DetailHistory.vue";
import CustomerProfile from "../views/Customer/Profile.vue";
import CustomerTopup from "../views/Customer/Topup.vue";
import CustomerCheckout from "../views/Customer/Checkout.vue";

import CobaAxios from "../views/CobaAxios.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/coba-axios",
      name: "coba-axios",
      component: CobaAxios,
    },
    {
      path: "",
      name: "/landing-page",
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
    // Admin
    {
      path: "/admin",
      component: AdminLayout,
      children: [
        {
          path: "",
          name: "admin",
          component: AdminHome,
        },
        {
          path: "customers",
          name: "admin-customers",
          component: AdminCustomers,
        },
        {
          path: "providers",
          name: "admin-providers",
          component: AdminProviders,
        },
        {
          path: "history",
          name: "admin-history",
          component: AdminHistory,
        },
      ],
    },
    // provider
    {
      path: "/provider",
      component: ProviderLayout,
      children: [
        {
          path: "",
          name: "provider",
          component: ProviderHome,
        },
        {
          path: "menus",
          children: [
            {
              path: "",
              name: "provider-menus",
              component: ProviderMenus,
            },
            {
              path: "add",
              name: "provider-menus-add",
              component: ProviderMenusAdd,
            },
            {
              path: "detail/:id",
              name: "provider-menus-detail",
              component: ProviderMenusDetail,
            },
            {
              path: "edit/:id",
              name: "provider-menus-edit",
              component: ProviderMenusEdit,
            },
          ],
        },
        {
          path: "history",
          name: "provider-history",
          component: ProviderHistory,
        },
      ],
    },
    // customer
    {
      path: "/customer",
      component: CustomerLayout,
      children: [
        {
          path: "",
          name: "customer",
          component: CustomerHome,
        },
        {
          path: "search",
          name: "customer-search",
          component: CustomerSearch,
        },
        {
          path: "history",
          children: [
            {
              path: "",
              name: "customer-history",
              component: CustomerHistory,
            },
            {
              path: ":id",
              name: "customer-history-detail",
              component: CustomerDetailHistory,
            },
          ],
        },
        {
          path: "profile",
          name: "customer-profile",
          component: CustomerProfile,
        },
        {
          path: "topup",
          name: "customer-topup",
          component: CustomerTopup,
        },
        {
          path: "checkout",
          name: "customer-checkout",
          component: CustomerCheckout,
        },
      ],
    },
  ],
});

export default router;
