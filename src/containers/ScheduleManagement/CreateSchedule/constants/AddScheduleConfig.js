export const emptyField = 'Atleast add one token for the schedule';

export const addSchedule = {
	hospital: {
		type: 'select',
		emptyField: 'Field cannot be empty',
		errorText: 'Numbers and special characters are not allowed'
	},
	doctor: {
		type: 'select',
		emptyField: 'Field cannot be empty',
		errorText: 'Numbers and special characters are not allowed'
	},
	weekday: {
		type: 'text',
		emptyField: 'Field cannot be empty',
	},
	fromTime: {
		type: 'date',
		dbKey: 'startTime',
		emptyField: 'Field cannot be empty',
		errorText: 'Numbers and special characters are not allowed'
	},
	toTime: {
		type: 'date',
		dbKey: 'endTime',
		emptyField: 'Field cannot be empty',
		errorText: 'Numbers and special characters are not allowed'
	}
}

export const addToken = {
	startTime: {
		type: 'date',
		emptyField: 'Field cannot be empty',
	},
	endTime: {
		type: 'date',
		emptyField: 'Field cannot be empty',
	},
	type: {
		type: 'select',
		dbKey: 'tokenType',
		emptyField: 'Field cannot be empty',
	},
	tokenNo: {
		type: 'number',
		emptyField: 'Field cannot be empty',
	}
}