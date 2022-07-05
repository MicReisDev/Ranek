import axios from "axios";

const axiosBase = axios.create({
  baseURL:"http://localhost:3000"
})

export const api = {
  get(url){
    return axiosBase.get(url);
  },
  post(url, body){
    return axiosBase.post(url, body);
  },
  put(url, body){
    return axiosBase.put(url, body);
  },
  delete(url){
    return axiosBase.delete(url);
  }
}