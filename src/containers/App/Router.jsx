import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../Layout/index';
import MainWrapper from './MainWrapper';

import LogIn from '../LogIn/index';
import ViewUsers from '../UserManagement/ViewUsers/index';
import CreateDoctor from '../DoctorManagement/CreateDoctor/index';
import ViewDoctors from '../DoctorManagement/ViewDoctors/index';
import CreateHospital from '../HospitalManagement/CreateHospital/index';
import ViewHospitals from '../HospitalManagement/ViewHospitals/index';
import CreateSchedule from '../ScheduleManagement/CreateSchedule/index';
import ViewSchedules from '../ScheduleManagement/ViewSchedule/index';
import Announcement from '../Announcement';
import CreateFrontdeskUser from '../FrontdeskUsers/CreateFrontdeskUser';
import ViewFrontdeskUser from '../FrontdeskUsers/ViewFrontdeskUser';
import LinkFrontdeskUser from '../FrontdeskUsers/LinkFrontdeskUser';

import {
  ROUTE_CREATE_DOCTOR,
  ROUTE_VIEW_DOCTORS,
  ROUTE_CREATE_HOSPITAL,
  ROUTE_VIEW_HOSPITALS,
  ROUTE_CREATE_SCHEDULE,
  ROUTE_VIEW_SCHEDULES,
  ROUTE_VIEW_USERS,
  ROUTE_ANNOUNCEMENT,
  ROUTE_CREATE_FRONTDESK_USER,
  ROUTE_VIEW_FRONTDESK_USER,
  ROUTE_LINK_FRONTDESK_USER
} from '../../constants/routes';

const Pages = () => (
  <Switch>
    <Route path={ROUTE_VIEW_USERS} component={ViewUsers} />
    <Route path={ROUTE_CREATE_DOCTOR} component={CreateDoctor} />
    <Route path={ROUTE_VIEW_DOCTORS} component={ViewDoctors} />
    <Route path={ROUTE_CREATE_HOSPITAL} component={CreateHospital} />
    <Route path={ROUTE_VIEW_HOSPITALS} component={ViewHospitals} />
    <Route path={ROUTE_CREATE_SCHEDULE} component={CreateSchedule} />
    <Route path={ROUTE_VIEW_SCHEDULES} component={ViewSchedules} />
    <Route path={ROUTE_ANNOUNCEMENT} component={Announcement} />
    <Route path={ROUTE_CREATE_FRONTDESK_USER} component={CreateFrontdeskUser} />
    <Route path={ROUTE_VIEW_FRONTDESK_USER} component={ViewFrontdeskUser} />
    <Route path={ROUTE_LINK_FRONTDESK_USER} component={LinkFrontdeskUser} />
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
