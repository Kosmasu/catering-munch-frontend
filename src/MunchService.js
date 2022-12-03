import axios from "axios";

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
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      "Content-type": "application/json",
    },
  });

  // COMMON
  static login(email, password) {
    return this.http.post("/login", {
      users_email: email,
      password,
    });
  }

  static register(name, email, alamat, telepon, password, role, tna) {
    return this.http.post("/register", {
      name,
      email,
      alamat,
      telepon,
      password,
      role,
      tna,
    });
  }

  static getUser() {
    return this.http.get("/user");
  }

  static logout() {
    return this.http.post("/logout");
  }

  // ADMIN
  static getAllCustomers() {
    return this.http.get("/admin/users/getAllCustomers");
  }

  static getAllProviders() {
    return this.http.get("/admin/users/getAllProviders");
  }

  static banUser(id) {
    return this.http.get("/admin/users/banUser/" + id);
  }

  static unbanUser(id) {
    return this.http.get("/admin/users/unbanUser/" + id);
  }

  static approveProvider(id) {
    return this.http.get("/admin/users/approveProvider/" + id);
  }

  // PROVIDER
  static menu() {
    return this.http.get("provider/menu");
  }

  static addMenu() {
    return this.http.get("provider/menu/add");
  }

  static getPesananProvider() {
    return this.http.get("/pesanan/getPesananProvider");
  }
}

export default MunchService;
