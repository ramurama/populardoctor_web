const endpoints = {
	login: '/api/v1/auth/admin',
	loginStatus: '/api/v1/auth/admin/loginstatus',
	logout: '/api/v1/admin/logout',
	sendOTP: '/api/v1/sendOTP',
  
	doctorList: '/api/v1/admin/getDoctors/',
	createDoctor: '/api/v1/admin/createDoctor',
	uploadProfileImage: '/api/v1/admin/uploadDoctorProfileImage',
	getSpecializations: '/api/v1/admin/getSpecializations',
	createHospital: '/api/v1/admin/createHospital',
  
	createSchedule: '/api/v1/admin/createSchedule',
	getDoctorMasterList: '/api/v1/admin/getMasterDoctors',
	getHospitalMasterList: '/api/v1/admin/getMasterHospitals',
	
	getFrontdeskUsersMasterList: '/api/v1/admin/getMasterFrontdeskUsers',
	createFrontdeskUser: '/api/v1/admin/createFrontdeskUser/',
	getDoctorFrontdeskUser: '/api/v1/admin/getDoctorFrontdeskUser/',
  
	getCustomerList: '/api/v1/admin/getCustomers/',
	getScheduleList: '/api/v1/admin/getSchedules/',
  
	blockUser: '/api/v1/admin/blockUser',
	unblockUser: '/api/v1/admin/unblockUser',
  
	getHospitalList: '/api/v1/admin/getHospitals/',
  
	getFrontdeskList: '/api/v1/admin/getFrontdeskUsers/',
	getScheduleDoctors: '/api/v1/admin/getScheduleDoctors/',
	getScheduleHospitals: '/api/v1/admin/getScheduleHospitals',
  
	sendAnnouncement: '/api/v1/messages/push',
	getAnnouncements: '/api/v1/admin/getAnnouncements',
  
	getBookings: '/api/v1/admin/getBookingHistory',
	getBookingDetail: '/api/v1/admin/getBookingHistoryDetail',
  
	getSupportDetails: '/api/v1/user/getSupportDetails',
	setSupportDetails: '/api/v1/admin/setSupportDetails',
  
	changePassword: '/api/v1/admin/changePassword'
  };
  
  export default endpoints;
  