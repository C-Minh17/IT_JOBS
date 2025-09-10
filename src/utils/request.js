const API_DOMAIN = "https://nkeggbslgiiyzbrqukqx.supabase.co/rest/v1/"

export const get = async (path)=>{
  const res = await fetch(API_DOMAIN + path,{
    method: "GET",
    headers: {
      apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZWdnYnNsZ2lpeXpicnF1a3F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4ODU5NjgsImV4cCI6MjA3MTQ2MTk2OH0.-yQBMyhE_6G-rzb3vOg_YDU6I93KSzB1bCmPgbC-nCA",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZWdnYnNsZ2lpeXpicnF1a3F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4ODU5NjgsImV4cCI6MjA3MTQ2MTk2OH0.-yQBMyhE_6G-rzb3vOg_YDU6I93KSzB1bCmPgbC-nCA`,
    },
  })
  const data = await res.json()
  return data
}

export const post = async (path,options) =>{
  const res = await fetch(API_DOMAIN + path,{
    method:"POST",
    headers:{
      apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZWdnYnNsZ2lpeXpicnF1a3F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4ODU5NjgsImV4cCI6MjA3MTQ2MTk2OH0.-yQBMyhE_6G-rzb3vOg_YDU6I93KSzB1bCmPgbC-nCA",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZWdnYnNsZ2lpeXpicnF1a3F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4ODU5NjgsImV4cCI6MjA3MTQ2MTk2OH0.-yQBMyhE_6G-rzb3vOg_YDU6I93KSzB1bCmPgbC-nCA`,
      "Content-Type":"application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify(options),
  })
  const data = await res.json()
  return data
}

export const del = async (path)=>{
  const res = await fetch(API_DOMAIN + path,{
    method: "DELETE",
    headers: {
      apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZWdnYnNsZ2lpeXpicnF1a3F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4ODU5NjgsImV4cCI6MjA3MTQ2MTk2OH0.-yQBMyhE_6G-rzb3vOg_YDU6I93KSzB1bCmPgbC-nCA",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZWdnYnNsZ2lpeXpicnF1a3F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4ODU5NjgsImV4cCI6MjA3MTQ2MTk2OH0.-yQBMyhE_6G-rzb3vOg_YDU6I93KSzB1bCmPgbC-nCA`,
    },
  })
  return res.ok
}

export const patch = async (path,options) =>{
  const res = await fetch(API_DOMAIN + path,{
    method:"PATCH",
    headers:{
      apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZWdnYnNsZ2lpeXpicnF1a3F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4ODU5NjgsImV4cCI6MjA3MTQ2MTk2OH0.-yQBMyhE_6G-rzb3vOg_YDU6I93KSzB1bCmPgbC-nCA",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZWdnYnNsZ2lpeXpicnF1a3F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4ODU5NjgsImV4cCI6MjA3MTQ2MTk2OH0.-yQBMyhE_6G-rzb3vOg_YDU6I93KSzB1bCmPgbC-nCA`,
      "Content-Type":"application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify(options),
  })
  const data = await res.json()
  return data
}