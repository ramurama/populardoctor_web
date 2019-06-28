import { post, get, put, del } from './fetch';
import Endpoint from './endpoints';

export  function getDoctorList () {
	return function (dispatch){
		return get(Endpoint.getDoctorMasterList)
		.then((response) => response.json())
		.then((data) => {
			dispatch({
				type: 'RESPONSE_DOCTOR_MASTERLIST',
				data
			});
		});
	};
};
export  function getHospitalList () {
	return function (dispatch){
		return get(Endpoint.getHospitalMasterList)
		.then((response) => response.json())
		.then((data) => {
			dispatch({
				type: 'RESPONSE_HOSPITAL_MASTERLIST',
				data
			});
		});
	};
};
export  function getScheduleList (doctorId) {
	const endpoint = `${Endpoint.getScheduleList}${doctorId}`;
	return function (dispatch){
		return get(endpoint)
		.then((response) => response.json())
		.then((data) => {
			dispatch({
				type: 'RESPONSE_SCHEDULE_LIST',
				data
			});
		});
	};
};

export  function getScheduleDetail (id) {
	const endpoint = `${Endpoint.getScheduleDetail}${id}`;
	return function (dispatch){
		return get(endpoint)
		.then((response) => response.json())
		.then((data) => {
			dispatch({
				type: 'RESPONSE_SCHEDULE_DETAIL',
				data
			});
		});
	};
};

export  function clearScheduleDetail () {
	return {
		type: 'RESPONSE_SCHEDULE_DETAIL',
		data: [],
	};
}
export function save(saveData){
	return post(Endpoint.createSchedule, saveData);
}

export function updateSchedule( data, scheduleId){
	const endpoint = `${Endpoint.updateSchedule}${scheduleId}`;
	return put( endpoint, data);
}
export function deleteSchedule(scheduleId){
	const endpoint = `${Endpoint.deleteSchedule}${scheduleId}`;
	return del( endpoint);
}