import React from "react";
import { Card, CardBody, Col } from "reactstrap";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Avatar from '@material-ui/core/Avatar';
import { connect } from "react-redux";
import MaterialTable from "../../../../components/containers/Tables/MaterialTable/index";
import { UNDERSCORE } from "../../../../constants/utils";
import * as Action from "../../../../redux/actions/doctorActions";
import UserBlockToggle from "../../../../components/user/userBlockToggle";
import Notifications from '../../../../components/containers/Notification/index';

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
class DoctorManagementCard extends React.Component {

	state = {
		show: false,
		title: '',
		userStatus: '',
		message:'',
	}

  componentWillMount() {
		this._onLoad();
    this.props.getSpecialization();
  }

	_onLoad = () => {
		this.props.getDoctorList();;
	}
	renderAvatar = (text) => 
			(<div style={{display: 'flex', width: 200}}>
				<strong>{text.doctorDetails.fullName}</strong>
			</div>);
	
	_handleNotification = (value) =>{
		console.log(value)
		this.setState({...value});
	}

	_renderToggle = (row) => {
		return (
			<UserBlockToggle
				data={row}
				status={row.doctorDetails.status}
				id={row.userId}
				loadData={this._onLoad}
				afterToggle={(value) => this._handleNotification(value)}
			/>
		)
	}

  render() {
		const { doctorList } = this.props;
    const columns = [
      {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Name",
        render: text => this.renderAvatar(text)
			},
			{
        id: "phone",
        numeric: false,
        disablePadding: true,
        label: "Doctor Id",
        render: text => text.doctorDetails.username
      },
      {
        id: "specialization",
        numeric: false,
        disablePadding: true,
        label: "Specialization"
      },
      {
        id: "phone",
        numeric: false,
        disablePadding: true,
        label: "Contact",
        render: text => text.doctorDetails.username
      },
      {
        id: "degree",
        numeric: false,
        disablePadding: true,
				label: "Education",
				render: text => text.degree,
      },
      {
        id: "action",
				label: "Operation",
				render: text => this._renderToggle(text)
      }
    ];

    return (
      <Col md={12}>
        <Card style={{ height: '80vh'}}>
          <CardBody>
            <div className="card__title">
              <MaterialTable columns={columns} data={doctorList} />
            </div>
						<Notifications
							show={this.state.show}
							title={`User ${this.state.userStatus}`}
							message={this.state.message}
						/>
          </CardBody>
        </Card>
      </Col>
    );
  }
}
function mapStateToProps(state) {
  const doctorState = state.doctor;
  return {
    specializations: !UNDERSCORE.isEmpty(doctorState)
      ? doctorState.specialization
      : [],
    doctorList:
      !UNDERSCORE.isEmpty(doctorState) &&
      !UNDERSCORE.isEmpty(doctorState.doctorList)
        ? doctorState.doctorList.doctors
        : [],
    totalCount:
      !UNDERSCORE.isEmpty(doctorState) &&
      !UNDERSCORE.isEmpty(doctorState.doctorList)
        ? doctorState.doctorList.totalRecords
        : 0
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getSpecialization: () => {
      dispatch(Action.getSpecialization());
    },
    getDoctorList: () => {
      dispatch(Action.getDoctorList());
    }
  };
}

DoctorManagementCard.contextTypes = {
  router: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DoctorManagementCard));
