import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import AdminLayout from "../views/Admin/Layout.vue";
import AdminHome from "../views/Admin/Home.vue";
import AdminCustomers from "../views/Admin/Customers.vue";
import AdminProviders from "../views/Admin/Providers.vue";
import AdminHistory from "../views/Admin/History.vue";
import ProviderHome from "../views/Provider/Home.vue";
import ProviderMenus from "../views/Provider/Menus.vue";
import ProviderMenusDetail from "../views/Provider/MenusDetail.vue";
import ProviderMenusAdd from "../views/Provider/MenusAdd.vue";
import ProviderMenusEdit from "../views/Provider/MenusEdit.vue";
import ProviderHistory from "../views/Provider/History.vue";
import CustomerHome from "../views/Customer/Home.vue";

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
    {
      path: "/provider",
      name: "provider",
      component: ProviderHome,
    },
    {
      path: "/provider/menus",
      name: "provider-menus",
      component: ProviderMenus,
    },
    {
      path: "/provider/menus/add",
      name: "provider-menus-add",
      component: ProviderMenusAdd,
    },
    {
      path: "/provider/menus/detail/:id",
      name: "provider-menus-detail",
      component: ProviderMenusDetail,
    },
    {
      path: "/provider/menus/edit/:id",
      name: "provider-menus-edit",
      component: ProviderMenusEdit,
    },
    {
      path: "/provider/history",
      name: "provider-history",
      component: ProviderHistory,
    },
    {
      path: "/customer",
      name: "customer",
      component: CustomerHome,
    },
  ],
});

export default router;
