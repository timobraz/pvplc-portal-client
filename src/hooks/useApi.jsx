import axios from "axios";
const useApi = (route) => {
  const instance = axios.create({ baseURL: process.env.REACT_APP_API_URL || "http://localhost:3080/api", withCredentials: true });
  return instance;
};

export default useApi;
