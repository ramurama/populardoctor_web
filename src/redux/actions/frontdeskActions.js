import { get } from "./fetch";
import Endpoint from "./endpoints";

export function getFdUserList() {
  const endpoint = Endpoint.getFrontDeskUsers;
  return function(dispatch) {
    return get(endpoint)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: "RESPONSE_FRONTDESK_USER_LIST",
          data
        });
      });
  };
}
