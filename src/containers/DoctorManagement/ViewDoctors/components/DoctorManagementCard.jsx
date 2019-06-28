import React from "react";
import { Card, CardBody, Col, Button } from "reactstrap";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import MaterialTable from "../../../../components/containers/Tables/MaterialTable/index";
import { UNDERSCORE } from "../../../../constants/utils";
import * as Action from "../../../../redux/actions/doctorActions";
import UserBlockToggle from "../../../../components/user/userBlockToggle";

class DoctorManagementCard extends React.Component {
  componentWillMount() {
    this._onLoad();
    this.props.getSpecialization();
  }

  _onLoad = () => {
    this.props.getDoctorList();
  };
  renderDoctorCell = text => (
    <div style={{ display: "flex", width: 200 }}>
      <strong>{text.doctorDetails.fullName}</strong>
    </div>
  );

	_handleEditHospital = (data) => {
		this.context.router.history.push(`/pages/doctorManagement/editDoctor/${data.doctorPdNumber}`)
	}

  _renderToggle = row => {
    return (
      <div style={{display:'flex'	}}>
        <UserBlockToggle
          data={row}
          status={row.doctorDetails.status}
          id={row.userId}
          loadData={this._onLoad}
        />
        <Button className="icon" onClick={() => this._handleEditHospital(row)}>
          <span class="lnr lnr-pencil" />
        </Button>
      </div>
    );
  };

  render() {
    const { doctorList } = this.props;
    const columns = [
      {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Name",
        render: text => this.renderDoctorCell(text)
      },
      {
        id: "doctorPdNumber",
        numeric: false,
        disablePadding: true,
        label: "Doctor Id",
        render: text => text.doctorPdNumber
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
        render: text => text.degree
      },
      {
        id: "action",
        label: "Operation",
        render: text => this._renderToggle(text)
      }
    ];

    return (
      <Col md={12}>
        <Card>
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
