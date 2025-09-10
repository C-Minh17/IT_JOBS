import { del, get, patch, post } from "../utils/request";

export async function createUser(data){
  const res = await post("users",data)
  return res
}

export async function getUsers(){
  const res = await get("users")
  return res
}

export async function delUser(id){
  const res = await del( `users?id=eq.${id}`)
  return res
}

export async function changeUser(id,data) {
  const res = await patch(`users?id=eq.${id}`,data)
  return res
}