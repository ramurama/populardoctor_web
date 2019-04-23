import { post, get } from './fetch';
import Endpoint from './endpoints';

export  function getCustomerList (pageNo, size) {
	const endpoint = `${Endpoint.getCustomerList}`;
	return function (dispatch){
		return get(endpoint)
		.then((response) => response.json())
		.then((data) => {
			dispatch({
				type: 'RESPONSE_CUSTOMERLIST',
				data
			});
		});
	};
};



export function blockUser(userId){
	return post(Endpoint.blockUser, userId);
}
export function unblockUser(userId){
	return post(Endpoint.unblockUser, userId);
}
