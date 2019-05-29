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
  SETTINGS,
  FRONTDESK_USERS,
  CREATE_USER,
  LINK_USER,
  ANNOUNCEMENT,
  BOOKINGS,
  CUSTOMER_CARE
} from '../../../constants/strings';
import {
  ROUTE_CREATE_DOCTOR,
  ROUTE_VIEW_DOCTORS,
  ROUTE_CREATE_HOSPITAL,
  ROUTE_VIEW_HOSPITALS,
  ROUTE_CREATE_SCHEDULE,
  ROUTE_VIEW_SCHEDULES,
  ROUTE_VIEW_USERS,
  ROUTE_CREATE_FRONTDESK_USER,
  ROUTE_VIEW_FRONTDESK_USER,
  ROUTE_ANNOUNCEMENT,
  ROUTE_VIEW_BOOKINGS,
  ROUTE_CUSTOMER_CARE,
  ROUTE_SETTINGS
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
          <SidebarCategory title={USER_MANAGEMENT} icon='users'>
            <SidebarLink
              title={VIEW_USERS}
              route={ROUTE_VIEW_USERS}
              onClick={this.hideSidebar}
            />
          </SidebarCategory>
          <SidebarCategory title={DOCTOR_MANAGEMENT} icon='heart-pulse'>
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
          <SidebarCategory title={HOSPITAL_MANAGEMENT} icon='apartment'>
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
          <SidebarCategory title={SCHEDULE_MANAGEMENT} icon='clock'>
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
          <SidebarCategory title={FRONTDESK_USERS} icon='screen'>
            <SidebarLink
              title={CREATE_USER}
              route={ROUTE_CREATE_FRONTDESK_USER}
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title={VIEW_USERS}
              route={ROUTE_VIEW_FRONTDESK_USER}
              onClick={this.hideSidebar}
            />
          </SidebarCategory>
          <SidebarLink
            title={ANNOUNCEMENT}
            route={ROUTE_ANNOUNCEMENT}
            onClick={this.hideSidebar}
            icon='bullhorn'
          />
          <SidebarLink
            title={BOOKINGS}
            route={ROUTE_VIEW_BOOKINGS}
            onClick={this.hideSidebar}
            icon='tag'
          />
          <SidebarLink
            title={CUSTOMER_CARE}
            route={ROUTE_CUSTOMER_CARE}
            onClick={this.hideSidebar}
            icon='phone-handset'
          />
          <div style={{ position: 'absolute', bottom: 8 }}>
            <SidebarLink
              title={SETTINGS}
              route={ROUTE_SETTINGS}
              onClick={this.hideSidebar}
              icon='cog'
            />
          </div>
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
