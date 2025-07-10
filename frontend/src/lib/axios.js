import axios from 'axios';

// Im Produktionsbetrieb gibt es kein localhost, daher müssen wir dies dynamisch gestalten
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export default apiClient;
