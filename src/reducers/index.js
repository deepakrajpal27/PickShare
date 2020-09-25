const initialState = {
    data: []
  };
  
  function rootReducer(state = initialState, action) {
    if (action.type === "SAVE_DATA") {
        state.data=action.payload
      }
    return state;
  };
  
  export default rootReducer;