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
import * as Action from "../../../../redux/actions/doctorActions";

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
  componentWillMount() {
    this.props.getDoctorList(1, 5);
    this.props.getSpecialization();
  }

	renderAvatar = (text) => 
			(<div style={{display: 'flex', width: 200}}>
				<Avatar alt="L" src={text.doctorDetails.profileImage} classes={styles.avatar} />
				<a style={{padding: 20}}>
					<strong>{text.doctorDetails.fullName}</strong>
				</a>
			</div>);
	


	_renderToggle = (text) => {
		const color = (text.doctorDetails.status === 'ACTIVE') ? false: true;
		const tooltext = (text.doctorDetails.status === 'ACTIVE') ? 'Block': 'Unblock';
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
    getDoctorList: (page, size) => {
      dispatch(Action.getDoctorList(page, size));
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
