import axios from "axios";

const ApiService = axios.create({
  //baseURL: "http://54.169.195.223:3001/",
  baseURL: "http://localhost:3001/",
  timeout: 30000,
});

ApiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers!["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// ApiService.interceptors.response.use(null, async  (error) =>{

//   const originalRequest = error.config;
//   let _isExpired=false
//   if (error.response.data.tokenExpired !== undefined && error.response.data.tokenExpired ) {
//     _isExpired=true
//    }
//   if (error.config && error.response && error.response.status === 401  && _isExpired) {
//       originalRequest._retry = true;
//       await store.dispatch("refreshToken");
//       const _token = localStorage.getItem('AccessToken');
//       axios.defaults.headers.common['Authorization'] = 'Bearer ' + _token;
//       return ApiService.request(originalRequest);
//   }
//  return Promise.reject(error);
// });

export default ApiService;
