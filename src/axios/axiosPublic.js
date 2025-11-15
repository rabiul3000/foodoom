import axios from "axios";
import { baseURL } from "../constants";

export const axiosPublic = axios.create({
  baseURL: baseURL,
});
