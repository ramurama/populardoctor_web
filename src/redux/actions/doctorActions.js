import { post, get } from './fetch';
import Endpoint from './endpoints';

export  function getDoctorList (pageNo, size) {
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


export function save(saveData){
	return post(Endpoint.createDoctor, saveData);
}