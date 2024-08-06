"use server";
import { cookies } from "next/headers";

async function RemoveCookie(name) {
  return cookies().delete(name);
}

export default RemoveCookie;
