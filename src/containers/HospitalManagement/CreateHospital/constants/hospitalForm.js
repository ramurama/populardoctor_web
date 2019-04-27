export const emptyField = 'Please select the above value';

export const addHospital = {
	name: {
		type: 'text',
		emptyField: 'Field cannot be empty',
		length: 40,
		errorText: 'Numbers and special characters are not allowed'
	},
	location: {
		type: 'text',
		emptyField: 'Field cannot be empty',
		length: 40,
		errorText: 'Numbers and special characters are not allowed'
	},
	landmark: {
		type: 'text',
		emptyField: 'Field cannot be empty',
		length: 40,
		errorText: 'Numbers and special characters are not allowed'
	},
	no: {
		type: 'text',
		emptyField: 'Field cannot be empty',
		length: 300,
		errorText: 'Numbers and special characters are not allowed'
	},
	street: {
		type: 'text',
		emptyField: 'Field cannot be empty',
		length: 300,
		errorText: 'Numbers and special characters are not allowed'
	},
	state: {
		type: 'text',
		emptyField: 'Field cannot be empty',
		length: 300,
		errorText: 'Numbers and special characters are not allowed'
	},
	pincode: {
		type: 'number',
		emptyField: 'Field cannot be empty',
		length: 6,
		errorText: 'Enter valid mobile number it should be 6 digit'
	},
}
