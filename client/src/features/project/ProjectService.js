import http from "../../http-common";

class ProjectService {
  getAll() {
    return http.get("/projects");
  }
  get(id) {
    return http.get(`projects/${id}`);
  }
  create(data) {
    return http.post("/projects", data);
  }
  update(id, data) {
    return http.put(`/projects/${id}`, data);
  }
  delete(id) {
    return http.delete(`/projects/${id}`);
  }
}

export default new ProjectService();
