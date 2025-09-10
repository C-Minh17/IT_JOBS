function setToken(state=true,action){
  switch (action.type){
    case ("TOKEN"):
      return !state
    default:
      return state
  }
}

export default setToken