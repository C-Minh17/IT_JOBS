import { del, get, patch, post } from "../utils/request"


export const getApplications = async ()=>{
  const response = await get("applications")
  return response
}

export const getIdApplication = async (id)=>{
  const response = await get(`applications?id=eq.${id}`)
  return response
}

export const postApplication = async (data)=>{
  const response = await post("applications",data)
  return response
}

export const deleleApplication = async (id)=>{
  const response = await del(`applications?id=eq.${id}`)
  return response
}

export const patchApplication = async (id,data)=>{
  const response = await patch(`applications?id=eq.${id}`,data)
  return response
}