import axios from "axios";

const instance = axios.create({
  baseURL: "https://burhanpur-city-backend.vercel.app/api/", // change as per your backend
});

 
 
 
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // token stored after login
 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;