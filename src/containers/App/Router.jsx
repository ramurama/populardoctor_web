import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../Layout/index';
import MainWrapper from './MainWrapper';

import LogIn from '../LogIn/index';
import ViewUsers from '../UserManagement/ViewUsers/index';
import CreateDoctor from '../DoctorManagement/CreateDoctor/index';
import EditDoctor from '../DoctorManagement/CreateDoctor/editDoctor';
import ViewDoctors from '../DoctorManagement/ViewDoctors/index';
import CreateHospital from '../HospitalManagement/CreateHospital/index';
import EditHospitalPage from '../HospitalManagement/CreateHospital/editHospital';
import ViewHospitals from '../HospitalManagement/ViewHospitals/index';
import CreateSchedule from '../ScheduleManagement/CreateSchedule/index';
import EditSchedulePage from '../ScheduleManagement/CreateSchedule/editSchedule';
import ViewSchedules from '../ScheduleManagement/ViewSchedule/index';
import Announcement from '../Announcement';
import CreateFrontdeskUser from '../FrontdeskUsers/CreateFrontdeskUser';
import ViewFrontdeskUser from '../FrontdeskUsers/ViewFrontdeskUser';
import ViewBookings from '../Bookings/ViewBookings';
import ViewBookingDetail from '../Bookings/ViewBookingDetail';
import CustomerCare from '../CustomerCare';
import Settings from '../SettingsManagement'

import {
	ROUTE_CREATE_DOCTOR,
	ROUTE_EDIT_DOCTOR,
  ROUTE_VIEW_DOCTORS,
	ROUTE_CREATE_HOSPITAL,
	ROUTE_EDIT_HOSPITAL,
  ROUTE_VIEW_HOSPITALS,
  ROUTE_CREATE_SCHEDULE,
  ROUTE_VIEW_SCHEDULES,
  ROUTE_VIEW_USERS,
  ROUTE_ANNOUNCEMENT,
  ROUTE_CREATE_FRONTDESK_USER,
  ROUTE_VIEW_FRONTDESK_USER,
  ROUTE_VIEW_BOOKINGS,
  ROUTE_VIEW_BOOKING_DETAIL,
	ROUTE_CUSTOMER_CARE,
	ROUTE_EDIT_SCHEDULE,
  ROUTE_SETTINGS
} from '../../constants/routes';

const Pages = () => (
  <Switch>
    <Route path={ROUTE_VIEW_USERS} component={ViewUsers} />
    <Route path={ROUTE_CREATE_DOCTOR} component={CreateDoctor} />
		<Route path={ROUTE_EDIT_DOCTOR} component={EditDoctor} />
    <Route path={ROUTE_VIEW_DOCTORS} component={ViewDoctors} />
    <Route path={ROUTE_CREATE_HOSPITAL} component={CreateHospital} />
		<Route path={ROUTE_EDIT_HOSPITAL} component={EditHospitalPage} />
    <Route path={ROUTE_VIEW_HOSPITALS} component={ViewHospitals} />
    <Route path={ROUTE_CREATE_SCHEDULE} component={CreateSchedule} />
		<Route path={ROUTE_EDIT_SCHEDULE} component={EditSchedulePage} />
    <Route path={ROUTE_VIEW_SCHEDULES} component={ViewSchedules} />
    <Route path={ROUTE_ANNOUNCEMENT} component={Announcement} />
    <Route path={ROUTE_CREATE_FRONTDESK_USER} component={CreateFrontdeskUser} />
    <Route path={ROUTE_VIEW_FRONTDESK_USER} component={ViewFrontdeskUser} />
    <Route path={ROUTE_VIEW_BOOKINGS} component={ViewBookings} />
    <Route path={ROUTE_VIEW_BOOKING_DETAIL} component={ViewBookingDetail}  />
    <Route path={ROUTE_CUSTOMER_CARE} component={CustomerCare}  />
    <Route path={ROUTE_SETTINGS} component={Settings} />
  </Switch>
);

const wrappedRoutes = () => (
  <div>
    <Layout />
    <div className='container__wrap'>
      <Route path='/pages' component={Pages} />
    </div>
  </div>
);

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path='/' component={LogIn} />
        <Route exact path='/log_in' component={LogIn} />
        <Route path='/' component={wrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
