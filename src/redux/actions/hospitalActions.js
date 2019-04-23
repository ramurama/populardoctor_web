import { post, get } from './fetch';
import Endpoint from './endpoints';

export function save(saveData){
	return post(Endpoint.createHospital, saveData);
}
export  function getHospitalList (location) {
	const endpoint = `${Endpoint.getHospitalList}${location}`;
	return function (dispatch){
		return get(endpoint)
		.then((response) => response.json())
		.then((data) => {
			dispatch({
				type: 'RESPONSE_HOSPITALLIST',
				data
			});
		});
	};
};

