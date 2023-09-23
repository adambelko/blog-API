import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const protectedAxios = axios.create({
  baseURL: "http://localhost:8080",
});

const unprotectedAxios = axios.create({
  baseURL: "http://localhost:8080",
});

protectedAxios.interceptors.request.use(async (config) => {
  const token = Cookies.get("access_token");
  const expiration = jwtDecode(token).exp;

  if (expiration - Date.now() / 1000 < 300) {
    // If token expires within 1 minute, refresh it
    const refreshToken = Cookies.get("refresh_token");

    if (refreshToken) {
      try {
        const response = await axios.post("/admin/refresh-token", {
          refreshToken,
        });
        const newToken = response.data.token;

        Cookies.set("access_token", newToken, { expires: 1 });
      } catch (error) {
        console.error("Error refreshing access token:", error);
        window.location.href = "/login";
      }
    } else {
      console.error("No refresh token available");
      window.location.href = "/login";
    }
  }

  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});
export { protectedAxios, unprotectedAxios };
