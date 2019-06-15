import { post, get, put } from './fetch';
import Endpoint from './endpoints';

export  function getDoctorList () {
	const doctor =  `${Endpoint.doctorList}`;
	return function (dispatch){
		return get(doctor)
		.then((response) => response.json())
		.then((data) => {
			dispatch({
				type: 'RESPONSE_DOCTORLIST',
				data
			});
		});
	};
};

export  function getSpecialization() {
	return function (dispatch){
		return get(Endpoint.getSpecializations)
		.then((response) => response.json())
		.then((data) => {
			dispatch({
				type: 'RESPONSE_SPECIALIZATIONLIST',
				data
			});
		});
	};
};
export function getDoctorDetail(pdNumber){
	const endpoint = `${Endpoint.getDoctorDetail}${pdNumber}`;
	return function (dispatch){
		return get(endpoint)
		.then((response) => response.json())
		.then((data) => {
			dispatch({
				type: 'RESPONSE_DOCTORDETAIL',
				data
			});
		});
	};
}


export function save(saveData){
	return post(Endpoint.createDoctor, saveData);
}
export function update(saveData, id){
	return put(`${Endpoint.updateDoctor}/${id}`, saveData);
}