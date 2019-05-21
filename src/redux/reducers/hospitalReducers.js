export default (state = {}, action) => {
	switch (action.type) {
	 case 'RESPONSE_HOSPITALLIST':
		return {
			...state,
		 hospitalList: action.data,
		}
	 default:
		return state
	}
}
