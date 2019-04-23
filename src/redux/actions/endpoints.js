const endpoints = {
	login: '/api/v1/auth/admin',
	loginStatus: '/api/v1/auth/admin/loginstatus',
	logout: '/api/v1/admin/logout',
	sendOTP: '/api/v1/sendOTP',

	doctorList: '/api/v1/admin/getDoctors/',
	createDoctor: '/api/v1/admin/createDoctor',
	getSpecializations: '/api/v1/admin/getSpecializations',
	createHospital: '/api/v1/admin/createHospital',

	createSchedule: '/api/v1/admin/createSchedule',
	getDoctorMasterList: '/api/v1/admin/getMasterDoctors',
	getHospitalMasterList: '/api/v1/admin/getMasterHospitals',

	createFrontdesk: '/api/v1/admin/createFrontdesk/',
	getCustomerList: '/api/v1/admin/getCustomers/',
	getScheduleList: '/api/v1/admin/getSchedules/',

	blockUser: '/api/v1/admin/blockUser',
	unblockUser: '/api/v1/admin/unblockUser',

	getHospitalList: '/api/v1/admin/getHospitals/',

	getFrontdeskList: '/api/v1/admin/getFrontdeskUsers/',
	getScheduleDoctors: '/api/v1/admin/getScheduleDoctors/',
	getScheduleHospitals: '/api/v1/admin/getScheduleHospitals',
};

export default endpoints;