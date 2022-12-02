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
}

export default MunchService;
