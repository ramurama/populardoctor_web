export default (state = {}, action) => {
  switch (action.type) {
    case "RESPONSE_FRONTDESK_USER_LIST":
      return {
        ...state,
        fdUserList: action.data
      };

    default:
      return state;
  }
};
