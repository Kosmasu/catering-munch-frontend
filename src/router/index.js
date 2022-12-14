import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

import AdminLayout from "../views/Admin/Layout.vue";
import AdminHome from "../views/Admin/Home.vue";
import AdminCustomers from "../views/Admin/Customers.vue";
import AdminProviders from "../views/Admin/Providers.vue";
import AdminHistory from "../views/Admin/History.vue";
import AdminHistoryDetail from "../views/Admin/HistoryDetail.vue";

import ProviderLayout from "../views/Provider/Layout.vue";
import ProviderHome from "../views/Provider/Home.vue";
import ProviderProfile from "../views/Provider/Profile.vue";
import ProviderMenus from "../views/Provider/Menus.vue";
import ProviderMenusDetail from "../views/Provider/MenusDetail.vue";
import ProviderMenusAdd from "../views/Provider/MenusAdd.vue";
import ProviderMenusEdit from "../views/Provider/MenusEdit.vue";
import ProviderHistory from "../views/Provider/History.vue";
import ProviderHistoryDetail from "../views/Provider/HistoryDetail.vue";

import CustomerLayout from "../views/Customer/Layout.vue";
import CustomerHome from "../views/Customer/Home.vue";
import CustomerSearch from "../views/Customer/Search.vue";
import CustomerSearchDetail from "../views/Customer/SearchDetail.vue";
import CustomerPesan from "../views/Customer/Pesan.vue";
import CustomerHistory from "../views/Customer/History.vue";
import CustomerHistoryDetail from "../views/Customer/HistoryDetail.vue";
import CustomerProfile from "../views/Customer/Profile.vue";
import CustomerTopup from "../views/Customer/Topup.vue";
import CustomerCart from "../views/Customer/Cart.vue";

import CobaAxios from "../views/CobaAxios.vue";
import { useAuthStore } from "../stores/Auth/AuthStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //guest
    {
      path: "/coba-axios",
      name: "coba-axios",
      component: CobaAxios,
    },
    {
      path: "",
      name: "landing-page",
      component: LandingPage,
      meta: {
        role: "guest",
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        role: "guest",
      },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        role: "guest",
      },
    },
    // Admin
    {
      path: "/admin",
      component: AdminLayout,
      meta: {
        role: "admin",
      },
      children: [
        {
          path: ":page?",
          alias: "home/:page?",
          name: "admin",
          component: AdminHome,
        },
        {
          path: "customers/:page?",
          name: "admin-customers",
          component: AdminCustomers,
        },
        {
          path: "providers/:page?",
          name: "admin-providers",
          component: AdminProviders,
        },
        {
          path: "history",
          children: [
            {
              path: ":page?",
              name: "admin-history",
              component: AdminHistory,
            },
            {
              path: "detail/:id",
              name: "admin-history-detail",
              component: AdminHistoryDetail,
            },
          ],
        },
      ],
    },
    // provider
    {
      path: "/provider",
      component: ProviderLayout,
      meta: {
        role: "provider",
      },
      children: [
        {
          path: "",
          name: "provider",
          component: ProviderHome,
        },
        {
          path: "profile",
          name: "provider-profile",
          component: ProviderProfile,
        },
        {
          path: "menus",
          children: [
            {
              path: ":page?",
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
          children: [
            {
              path: ":page?",
              name: "provider-history",
              component: ProviderHistory,
            },
            {
              path: "detail/:id",
              name: "provider-history-detail",
              component: ProviderHistoryDetail,
            },
          ],
        },
      ],
    },
    // customer
    {
      path: "/customer",
      component: CustomerLayout,
      meta: {
        role: "customer",
      },
      children: [
        {
          path: "",
          name: "customer",
          component: CustomerHome,
        },
        {
          path: "search",
          children: [
            {
              path: ":page?",
              name: "customer-search",
              component: CustomerSearch,
            },
            {
              path: "provider/:id",
              name: "customer-search-detail",
              component: CustomerSearchDetail,
            },
          ],
        },
        {
          path: "history",
          children: [
            {
              path: ":page?",
              name: "customer-history",
              component: CustomerHistory,
            },
            {
              path: "detail/:id",
              name: "customer-history-detail",
              component: CustomerHistoryDetail,
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
          path: "pesan/:id",
          name: "customer-pesan",
          component: CustomerPesan,
        },
        {
          path: "cart",
          name: "customer-cart",
          component: CustomerCart,
        },
      ],
    },
  ],
});

router.beforeEach((to, from) => {
  /**
   * Ada beberapa kemungkinan:
   * 1. User adalah guest dan mengakses route dengan meta role: 'guest'
   *    pass
   * 2. User adalah guest dan mengakses route dengan meta role bukan 'guest'
   *    Maka redirect user ke { name:'login' }
   * 3. User bukan guest dan mengakses route dengan meta role: 'guest'
   *    Maka redirect ke masing-masing home user tersebut
   *    3.1. User adalah customer
   *         Maka redirect ke home customer
   *    3.2. User adalah provider
   *         Maka redirect ke home provider
   *    3.3. User adalah admin
   *         Maka redirect ke home admin
   * 4. User bukan guest dan mengakses route dengan meta role bukan role user
   *    Maka redirect ke home user. Sama seperti nomor 3
   * 5. User bukan guest dan mengakses route sesuai dengan meta role
   *    do nothing
   * 5 dan 1 bisa di gabung
   * 3 dan 4 bisa di gabung
   */
  const authStore = useAuthStore();
  const role = authStore.getUserFromLocalStorage().role;
  const metaRole = to.meta.role;

  // 2.
  if (role == "guest" && metaRole != "guest") {
    return { name: "login" };
  } else if (
    // 3.
    (role != "guest" && metaRole == "guest") ||
    // 4.
    (role != "guest" && role != metaRole)
  ) {
    if (role == "customer") return { name: "customer" };
    else if (role == "provider") return { name: "provider" };
    else if (role == "admin") return { name: "admin" };
  }
});

export default router;
