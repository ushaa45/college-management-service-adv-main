import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9090", // your Spring Boot URL
});

// Endpoints that must NOT carry a token (user isn't authenticated yet)
const PUBLIC_AUTH_PATHS = ["/auth/login", "/auth/register", "/auth/refresh"];

// Add token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  const isPublicAuthPath = PUBLIC_AUTH_PATHS.some((path) =>
      req.url?.includes(path));

  // 🚫 Skip token for login/register
  if (token && !isPublicAuthPath) {
      req.headers.Authorization = `Bearer ${token}`;
    }

  return req;
},
(error) => Promise.reject(error)
);

API.interceptors.response.use(
  (res) => res,
  (err) => {  
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default API;