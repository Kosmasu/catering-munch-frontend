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

  static logout() {
    return this.http.post("/logout");
  }

  // ADMIN
  static getCustomers(batch_size, currentPage = 1, users_nama = "") {
    return this.http.get(`/admin/users`, {
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

  static getProviders(batch_size, currentPage = 1, users_nama = "") {
    return this.http.get(`/admin/users`, {
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

  static banUser(id) {
    return this.http.patch("/admin/users/banUser/" + id);
  }

  static unbanUser(id) {
    return this.http.patch("/admin/users/unbanUser/" + id);
  }

  static approveProvider(id) {
    return this.http.patch("/admin/users/approveProvider/" + id);
  }

  // PROVIDER
  static menu(batch_size, currentPage = 1, id) {
    return this.http.get("/menu", {
      params: {
        page: currentPage,
        provider_id: id,
        batch_size: batch_size,
        sort: {
          column: "menu_nama",
          type: "asc",
        },
      },
    });
  }

  static detailMenu(id) {
    return this.http.get("/menu/" + id);
  }

  static addMenu() {
    return this.http.post("/menu");
  }

  static editMenu() {
    return this.http.patch("/menu/");
  }

  static deleteMenu(id) {
    return this.http.delete("/menu/" + id);
  }

  static getPesananProvider() {
    return this.http.get("/provider/pesanan/getPesananProvider");
  }
}

export default MunchService;
