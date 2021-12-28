import axios from "axios";

export default {
  findByDomain(domain) {
    return axios.post("/workspace/find-by-domain", { domain });
  },
};
