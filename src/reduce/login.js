const initialState = {
    tocken: "",
  };
  
  const tokenReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case "LOGIN":
        const {token}=payload;
        return token;
      case "LOGOUT":
        return payload;
    default:
        return state;
    }
  };
  export default tokenReducer;
  
  export const signIn =(data)=>{
      return{
          type:"LOGIN",
          payload:data
      }
  }
  export const logout =(data)=>{
      // this obj is action
    return{
        type:"LOGOUT",
        payload:data
    }
}
  