function statusLogin(state=false,action){
  switch (action.type){
    case ("ON"):
      return action.status
    case ("OFF"):
      return action.status
    default:
      return state
  }
}

export default statusLogin