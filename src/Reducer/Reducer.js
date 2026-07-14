export default function MyReducer(state, action) {
  let foundIndex;

  switch (action.type) {
    case "add":
      foundIndex = state.find(item => item.id ===action.payload)
      if (foundIndex){
        return state.map(item => item.id === action.payload ?
          {...item,quantity:item.quantity+1} :
          item
        )
      
      }
      else{
        return[...state,{id: action.payload,quantity:1}]
     
      }


    case "decrease":
      foundIndex = state.find((item) => item.id === action.payload);
      if (!foundIndex){
        return state
      }
      else{
        if (foundIndex.quantity>1){
          return state.map(item => item.id === action.payload ?
            {...item,quantity:item.quantity-1} :
            item
          )
        
        }
        else{
          return state.filter(item => item.id!=action.payload)
        }
      }


    case "clear":
      return [];
    default:
      return state;
      break;
    
    case "remove":
      return state.filter((item)=> item.id!== action.payload);
      
  }
}
