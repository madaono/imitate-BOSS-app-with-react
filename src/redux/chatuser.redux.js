const USER_LIST = 'USER_LIST'


const initState = {
  userList:[]
}

function chatuser(state, action) {
  switch (action.type){
    case USER_LIST:
    default:
      return state
  }
}

function userList(data) {
  return { type:USER_LIST, payload:data }
}

function getUserList(type) {
  return dispatch=>{
    
  }
}