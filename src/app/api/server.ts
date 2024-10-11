"use server";

import axios from "axios";

export const ssgServerAction = () => {
  const res = axios.get("https://jsonplaceholder.typicode.com/posts/10");
  console.log(res);
  return res;
};
