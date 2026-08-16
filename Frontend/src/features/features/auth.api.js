import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/auth", // Replace with your backend API URL
  withCredentials: true, // Include cookies in requests
});

export async function register({ email, username, password }) {
  const response = await api.post("/register", { email, username, password });
  return response.data;
}
export async function login({ email, password }) {
  const response = await api.post("/login", { email, password });
  return response.data;
}

export async function getMe() {
    const response = await api.get("/get-me");
    return response.data;
}