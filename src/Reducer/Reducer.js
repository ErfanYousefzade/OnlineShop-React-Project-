export default function MyReducer(state, action) {
  let foundIndex;

  switch (action.type) {
    case "add":
      foundIndex = state.findIndex((item) => item.id === action.payload);
      if (foundIndex === -1) {
        return [...state, { id: action.payload, quantity: 1 }];
      } else {
        return state.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      break;

    case "decrease":
      foundIndex = state.findIndex((item) => item.id === action.payload);

      if (foundIndex === -1) {
        return state;
      } else {
        if (state[foundIndex].quantity > 1) {
          return state.map((item, index) =>
            index === foundIndex
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          );
        } else {
          return state.filter((item) => item.id !== action.payload);
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
