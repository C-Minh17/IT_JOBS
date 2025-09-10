import { del, get, patch, post } from "../utils/request"

export const getJobs = async ()=>{
  const response = await get("jobs")
  return response
}

export const getJobParam = async (param)=>{
  const response = await get(`jobs?${param}`)
  return response
}

export const getIdJobs = async (id)=>{
  const response = await get(`jobs?id=eq.${id}`)
  return response
}

export const postJobs = async (data)=>{
  const response = await post("jobs",data)
  return response
}

export const deleleJobs = async (id)=>{
  const response = await del(`jobs?id=eq.${id}`)
  return response
}

export const patchJobs = async (id,data)=>{
  const response = await patch(`jobs?id=eq.${id}`,data)
  return response
}