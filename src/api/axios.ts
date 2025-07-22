// api/axios.ts
import axios from "axios";
import { store } from "../store/store";
import { setUser, clearUser } from "../store/userSlice";
import { broadcastUser, broadcastClear } from "../utils/broadcast";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ✅ Request interceptor – access token ekle
api.interceptors.request.use((config) => {
  const token = store.getState().user.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Response interceptor – token expired ise refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      store.getState().user.refreshToken
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh", {
          refreshToken: store.getState().user.refreshToken,
        });

        const { accessToken, refreshToken } = res.data;
        const name = store.getState().user.name;

        const user = {
          accessToken: accessToken as string,
          refreshToken: refreshToken as string,
          name: name as string,
        };

        store.dispatch(setUser(user));
        // broadcast user for other tabs
        broadcastUser(user);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        store.dispatch(clearUser());
        // broadcast clear for other tabs
        broadcastClear();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
