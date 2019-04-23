export default (state = {}, action) => {
	switch (action.type) {
	 case 'RESPONSE_CUSTOMERLIST':
		return {
			...state,
		 customerList: action.data,
		}
	 default:
		return state
	}
}
