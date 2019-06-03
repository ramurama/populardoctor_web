import { post, get, put } from './fetch';
import Endpoint from './endpoints';

export function save(saveData){
	return post(Endpoint.createHospital, saveData);
}
export function update(saveData, id){
	return put(`${Endpoint.updateHospital}/${id}`, saveData);
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

export function getHospitalDetail(pdNumber){
	const endpoint = `${Endpoint.getHospitalDetail}${pdNumber}`;
	return function (dispatch){
		return get(endpoint)
		.then((response) => response.json())
		.then((data) => {
			dispatch({
				type: 'RESPONSE_HOSPITALDETAIL',
				data
			});
		});
	};
}
