import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://quiz-react-3ce4b.firebaseio.com/'
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.params = { auth: token }
  }
  return config;
}, error => {
  return Promise.reject(error)
});

export default axiosInstance;
