export const emptyField = 'Please select the above value';

export const addDoctor = {
	fullName: {
		type: 'text',
		emptyField: 'Field cannot be empty',
		length: 40,
		errorText: 'Numbers and special characters are not allowed'
	},
	degree: {
		type: 'text',
		emptyField: 'Field cannot be empty',
		length: 40,
		errorText: 'Numbers and special characters are not allowed'
	},
	mobile: {
		type: 'number',
		emptyField: 'Field cannot be empty',
		length: 10,
		errorText: 'Enter valid mobile number it should be 10 digit'
	},
	yearsOfExperience: {
		type: 'number',
		emptyField: 'Field cannot be empty',
		length: 2,
		errorText: 'Enter valid mobile number it should be 10 digit'
	},
	profileContent: {
		type: 'text',
		emptyField: 'Field cannot be empty',
		length: 300,
		errorText: 'Numbers and special characters are not allowed'
	}
}
