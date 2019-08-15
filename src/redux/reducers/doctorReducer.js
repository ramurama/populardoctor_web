export default (state = {}, action) => {
	switch (action.type) {
		case 'RESPONSE_DOCTORLIST':
			return {
				...state,
				doctorList: action.data
			};
		case 'RESPONSE_SPECIALIZATIONLIST':
			return {
				...state,
				specialization: action.data
			};
		case 'RESPONSE_DOCTORDETAIL':
			return {
				...state,
				doctorDetail: action.data
			};
		default:
			return state
	}
}