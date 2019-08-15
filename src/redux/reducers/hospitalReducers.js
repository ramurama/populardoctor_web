export default (state = {}, action) => {
	switch (action.type) {
	 case 'RESPONSE_HOSPITALLIST':
		return {
			...state,
		 hospitalList: action.data,
		}
		case 'RESPONSE_HOSPITALDETAIL':
		return {
			...state,
		 hospitalDetail: action.data,
		}
		
	 default:
		return state
	}
}
