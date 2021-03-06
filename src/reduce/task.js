const initialState = {
    tasks: [],
  };
  
  const task = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case "GET":
        const { tasks } = payload;
        return { tasks };
      default:
        return state;
    }
  };
  export default task;
  export const getTask=(data)=>{
      return{
          type:"GET",
          payload:data
      }
  }