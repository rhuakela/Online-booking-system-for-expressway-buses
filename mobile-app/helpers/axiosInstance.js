import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${AsyncStorage.getItem("token")}`,
  },
});
