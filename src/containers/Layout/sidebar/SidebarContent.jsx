import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';
import {
  CREATE_DOCTOR,
  VIEW_DOCTORS,
  DOCTOR_MANAGEMENT,
  HOSPITAL_MANAGEMENT,
  USER_MANAGEMENT,
  VIEW_USERS,
  CREATE_HOSPITAL,
  VIEW_HOSPITALS,
  SCHEDULE_MANAGEMENT,
  CREATE_SCHEDULE,
  VIEW_SCHDULES,
  SETTINGS
} from '../../../constants/strings';
import {
  ROUTE_CREATE_DOCTOR,
  ROUTE_VIEW_DOCTORS,
  ROUTE_CREATE_HOSPITAL,
  ROUTE_VIEW_HOSPITALS,
  ROUTE_CREATE_SCHEDULE,
  ROUTE_VIEW_SCHEDULES,
  ROUTE_VIEW_USERS
} from '../../../constants/routes';

class SidebarContent extends Component {
  static propTypes = {
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
  };

  hideSidebar = () => {
    const { onClick } = this.props;
    onClick();
  };

  render() {
    const { changeToDark, changeToLight } = this.props;
    return (
      <div className='sidebar__content'>
        {/* <ul className='sidebar__block'>
          <SidebarLink title="Log In" icon="exit" route="/log_in" onClick={this.hideSidebar} />
          <SidebarCategory title='Layout' icon='layers'>
            <button
              type='button'
              className='sidebar__link'
              onClick={changeToLight}
            >
              <p className='sidebar__link-title'>Light Theme</p>
            </button>
            <button
              type='button'
              className='sidebar__link'
              onClick={changeToDark}
            >
              <p className='sidebar__link-title'>Dark Theme</p>
            </button>
          </SidebarCategory>
        </ul> */}
        <ul className='sidebar__block'>
          {/* <SidebarCategory title="Example Pages" icon="diamond">
            <SidebarLink title="Page one" route="/pages/one" onClick={this.hideSidebar} />
            <SidebarLink title="Page two" route="/pages/two" onClick={this.hideSidebar} />
            <SidebarLink title="Chart" route="/pages/chartjs" onClick={this.hideSidebar} />
          </SidebarCategory> */}
          <SidebarCategory title={USER_MANAGEMENT}>
            <SidebarLink
              title={VIEW_USERS}
              route={ROUTE_VIEW_USERS}
              onClick={this.hideSidebar}
            />
          </SidebarCategory>
          <SidebarCategory title={DOCTOR_MANAGEMENT} icon='diamond'>
            <SidebarLink
              title={CREATE_DOCTOR}
              route={ROUTE_CREATE_DOCTOR}
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title={VIEW_DOCTORS}
              route={ROUTE_VIEW_DOCTORS}
              onClick={this.hideSidebar}
            />
          </SidebarCategory>
          <SidebarCategory title={HOSPITAL_MANAGEMENT} icon='diamond'>
            <SidebarLink
              title={CREATE_HOSPITAL}
              route={ROUTE_CREATE_HOSPITAL}
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title={VIEW_HOSPITALS}
              route={ROUTE_VIEW_HOSPITALS}
              onClick={this.hideSidebar}
            />
          </SidebarCategory>
          <SidebarCategory title={SCHEDULE_MANAGEMENT} icon='diamond'>
            <SidebarLink
              title={CREATE_SCHEDULE}
              route={ROUTE_CREATE_SCHEDULE}
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title={VIEW_SCHDULES}
              route={ROUTE_VIEW_SCHEDULES}
              onClick={this.hideSidebar}
            />
          </SidebarCategory>
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
