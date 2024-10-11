import axios from "axios";
import React from "react";
import { ssgServerAction } from "../api/server";

const page = async () => {
  const res = await ssgServerAction();
  console.log(res);
  return <div></div>;
};

export default page;
