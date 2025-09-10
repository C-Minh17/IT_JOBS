import { del, get, patch, post } from "../utils/request"

export const getCompanies = async ()=>{
  const response = await get("companies")
  return response
}

export const getCompanyId = async (id)=>{
  const response = await get(`companies?id=eq.${id}`)
  return response
}

export const postCompanies = async (data)=>{
  const response = await post("companies",data)
  return response
}

export const deleleCompanies = async (id)=>{
  const response = await del(`companies?id=eq.${id}`)
  return response
}

export const patchCompanies = async (id,data)=>{
  const response = await patch(`companies?id=eq.${id}`,data)
  return response
}