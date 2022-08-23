import axios from "axios";

const ApiService = axios.create({
  //baseURL: "http://54.169.195.223:3001/",
  baseURL: "http://localhost:3001/",
  timeout: 10000,
});

export default ApiService;
