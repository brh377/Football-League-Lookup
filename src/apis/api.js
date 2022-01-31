import axios from "axios";
const KEY = '8304ed29a1mshd37efc65a1b5296p131d2fjsne7b87593383f';

export default axios.create({
  baseURL: "https://api-football-v1.p.rapidapi.com/v2",
  responseType: "json"
});

