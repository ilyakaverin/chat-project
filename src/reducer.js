export default (state, action) => {
  switch (action.type) {
    case "ENTERED":
      return {
        ...state,
        isEntered: true,
        username: action.payload.username,
        roomId: action.payload.roomId,
      };
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "SET_DATA":
      return {
        ...state,
        users: action.payload.users,
        messages: action.payload.messages,
      };
    case "NEW_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};
