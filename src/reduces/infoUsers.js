function infoUser(state={},action){
  switch (action.type){
    case "SAVE" :
      return action.data
    default :
      return state
  }
}

export default infoUser