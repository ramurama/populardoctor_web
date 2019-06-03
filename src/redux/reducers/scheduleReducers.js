export default (state = {}, action) => {
	switch (action.type) {
		case 'RESPONSE_DOCTOR_MASTERLIST':
			return {
				...state,
				doctorMasterList: action.data
			};
		case 'RESPONSE_HOSPITAL_MASTERLIST':
			return {
				...state,
				hospitalMasterList: action.data
			};
		case 'RESPONSE_SCHEDULE_LIST':
			return {
				...state,
				scheduleList: action.data
			};
		case 'RESPONSE_SCHEDULE_DETAIL':
			return {
				...state,
				scheduleDetail: action.data
			};
		default:
			return state
	}
}