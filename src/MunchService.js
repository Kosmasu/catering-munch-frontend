import axios, { Axios } from "axios";

class MunchService {
  constructor() {
    if (this instanceof StaticClass) {
      throw Error(
        "MunchService is a static class, thus cannot be instantiated."
      );
    }
  }

  static http = axios.create({
    // baseURL ini sesuaikan dengan url backend Anda
    baseURL: "http://localhost:8000/api",
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  });

  static paginate(axios) {
    if (typeof axios != Axios)
      throw Error("axios have to be an instance of Axios");
  }

  // AUTH
  static sanctum() {
    return axios
      .create({
        headers: {
          "Content-type": "application/json",
        },
      })
      .get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("response sanctum:", response);
        return response;
      })
      .catch((error) => {
        console.log("error sanctum:", error);
        return error;
      });
  }

  static login(email, password) {
    return this.http.post("/login", {
      users_email: email,
      password: password,
    });
  }

  static register(
    nama,
    email,
    alamat,
    telepon,
    password,
    password_confirmation,
    role,
    tnc
  ) {
    return this.http.post("/register", {
      users_nama: nama,
      users_email: email,
      users_alamat: alamat,
      users_telepon: telepon,
      users_password: password,
      users_password_confirmation: password_confirmation,
      users_role: role,
      tnc: tnc,
    });
  }

  static me() {
    return this.http.get("/mini-me");
  }

  static mystat() {
    return this.http.get("/mystat");
  }

  static logout() {
    return this.http.post("/logout");
  }

  // ADMIN
  static getCustomers(batch_size, currentPage, users_nama) {
    return this.http.get(`/users`, {
      params: {
        page: currentPage,
        users_role: "customer",
        users_nama: users_nama,
        batch_size: batch_size,
        sort: {
          column: "users_id",
          type: "asc",
        },
      },
    });
  }

  static getProviders(batch_size, currentPage, users_nama) {
    return this.http.get(`/users`, {
      params: {
        page: currentPage,
        users_role: "provider",
        users_nama: users_nama,
        batch_size: batch_size,
        sort: {
          column: "users_id",
          type: "asc",
        },
      },
    });
  }

  static getWaitingProviders(batch_size, currentPage) {
    return this.http.get(`/users`, {
      params: {
        page: currentPage,
        users_role: "provider",
        users_status: "menunggu",
        batch_size: batch_size,
        sort: {
          column: "users_id",
          type: "asc",
        },
      },
    });
  }

  static getHistoryLog(batch_size, currentPage, date_lower, date_upper) {
    return this.http.get(`/log`, {
      params: {
        page: currentPage,
        date_lower: date_lower,
        date_upper: date_upper,
        batch_size: batch_size,
        sort: {
          column: "log_timestamp",
          type: "desc",
        },
      },
    });
  }

  static getHistoryMenu(batch_size, currentPage, date_lower, date_upper) {}

  static getHistoryTopup(batch_size, currentPage) {}

  static banUser(id) {
    return this.http.patch(`/users/banUser/${id}`);
  }

  static unbanUser(id) {
    return this.http.patch(`/users/unbanUser/${id}`);
  }

  static approveProvider(id) {
    return this.http.patch(`/users/approveProvider/${id}`);
  }

  // PROVIDER
  static getMenus(batch_size, currentPage, provider_id, menu_nama) {
    return this.http.get("/menu", {
      params: {
        page: currentPage,
        provider_id: provider_id,
        menu_nama: menu_nama,
        batch_size: batch_size,
        sort: {
          column: "menu_id",
          type: "asc",
        },
      },
    });
  }

  static getMenuDetail(menu_id) {
    return this.http.get("/menu/" + menu_id);
  }

  static addMenu(formData) {
    return this.http.post("/menu", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static editMenu(formData, menu_id) {
    return this.http.post(`/menu/${menu_id}?_method=PATCH`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static deleteMenu(id) {
    return this.http.delete("/menu/" + id);
  }

  static getHistoryProvider(
    batch_size,
    currentPage,
    date_lower,
    date_upper,
    pemesanan_status
  ) {
    return this.http.get(
      `/pesanan?date_lower=${date_lower}&date_upper=${date_upper}`,
      {
        params: {
          page: currentPage,
          pemesanan_status: pemesanan_status,
          batch_size: batch_size,
          sort: {
            column: "created_at",
            type: "asc",
          },
        },
      }
    );
  }

  static getHistoryProviderDetail(pemesanan_id) {
    return this.http.get("/pesanan/" + pemesanan_id, {
      params: {
        sort: {
          column: "detail_tanggal",
          type: "asc",
        },
      },
    });
  }

  static getPesanan(month, year) {
    return this.http.get("/pesanan/showDelivery", {
      params: {
        month: month,
        year: year,
        sort: {
          column: "detail_tanggal",
          type: "asc",
        },
        detail_status: "belum dikirim",
      },
    });
  }

  static acceptPesanan(detail_id) {
    return this.http.post(`/pesanan/${detail_id}/accept`);
  }

  static rejectPesanan(detail_id) {
    return this.http.post(`/pesanan/${detail_id}/reject`);
  }

  static kirimPesanan(detail_id) {
    return this.http.post(`/pesanan/deliver/${detail_id}`);
  }

  // CUSTOMER
  static terimaPesanan(detail_id) {
    return this.http.post(`/pesanan/receive/${detail_id}`);
  }
}

export default MunchService;
