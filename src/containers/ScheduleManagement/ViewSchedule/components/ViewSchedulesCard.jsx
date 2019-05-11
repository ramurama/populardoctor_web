import React from "react";
import { Card, CardBody, Col } from "reactstrap";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { connect } from "react-redux";
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import MaterialTable from "../../../../components/containers/Tables/MaterialTable/index";
import { UNDERSCORE } from "../../../../constants/utils";
import * as Action from "../../../../redux/actions/scheduleActions";

const styles = {
	avatar: {
    margin: 10,
	},
	inactive: {
		color: 'white',
    background: '#ea5555'
	},
	active: {
		background: '#33bd33',
    color: 'white'
	},
}
class ScheduleManagementCard extends React.Component {
  componentWillMount() {
		this.props.getDoctorList();
		this.props.getHospitalList();
  }

	renderAvatar = (text) => 
			(<div style={{display: 'flex', width: 200}}>
				<Avatar alt="L" src={text.doctorDetails.profileImage} classes={styles.avatar} />
				<a style={{padding: 20}}>
					<strong>{text.doctorDetails.fullName}</strong>
				</a>
			</div>);
	


	_renderToggle = (text) => {
		const color = (text.status === 'ACTIVE') ? false: true;
		const tooltext = (text.status === 'ACTIVE') ? 'Block': 'Unblock';
		return (<Tooltip title={tooltext}>
			<Switch
				checked={color}
				onChange={()=> this.handleToggle(text)}
				value="checkedB"
				color="primary"
			/>
		</Tooltip>)
	}

	
  render() {
    const { userDataList } = this.props;
    const columns = [
			{ label: 'Hospital Name', numeric: false, disablePadding: true, render : (text) => text.hospital.name},
			{ label: 'Weekday', numeric: false, disablePadding: true, id: 'weekday' },
			{ label: 'Starttime', numeric: false, disablePadding: true, id: 'startTime' },
			{ label: 'Endtime', numeric: false, disablePadding: true, id: 'endTime' },
    ];

    return (
      <Col md={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <MaterialTable columns={columns} data={[]} />
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

function mapStateToProps(state){
	const scheduleState = state.schedule;
	return {
		doctorList:  scheduleState.doctorMasterList,
		scheduleList : !UNDERSCORE.isEmpty(scheduleState) && !UNDERSCORE.isEmpty(scheduleState.scheduleList) ?
						scheduleState.scheduleList : [],
	};
}
function mapDispatchToProps (dispatch) {
  return {
		getDoctorList: () => {
      dispatch(Action.getDoctorList())
		},
		getHospitalList: () => {
      dispatch(Action.getHospitalList())
		},
		getScheduleList: (doctorId) => {
			dispatch(Action.getScheduleList(doctorId))
		}
  }
}


ScheduleManagementCard.contextTypes = {
  router: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ScheduleManagementCard));
