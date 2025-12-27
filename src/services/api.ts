import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("calendar_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = Cookies.get("calendar_refresh_token");

      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });

          const cookieOptions = { expires: 7, secure: true, sameSite: "strict" as const };
          Cookies.set("calendar_token", data.accessToken, cookieOptions);
          Cookies.set("calendar_refresh_token", data.refreshToken, cookieOptions);

          error.config.headers.Authorization = `Bearer ${data.accessToken}`;
          return api.request(error.config);
        } catch {
          Cookies.remove("calendar_token");
          Cookies.remove("calendar_refresh_token");
          Cookies.remove("calendar_user");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  },
);

export const eventsApi = {
  getAll: () => api.get("/events"),
  create: (event: {
    title: string;
    description: string;
    date: string;
    hour: string;
    themeColor: string;
  }) => api.post("/events", event),
  update: (
    id: string,
    event: { title: string; description: string; date: string; hour: string; themeColor: string },
  ) => api.put(`/events/${id}`, event),
  delete: (id: string) => api.delete(`/events/${id}`),
};

export default api;
