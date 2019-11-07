const initialState = {
  data:{}
};


export default function userReducer(state = initialState, action){
  
  switch (action.type) { 
    case 'SET_DATA':
      var value = action.data.value;
      var key = action.data.key
      return { ...state, data: {...state.data, [key]:value}}
    case 'DELETE_DATA':
      return {...state, data:{}}
    default:
      return state
  }
}