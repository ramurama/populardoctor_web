import React from "react";
import { Card, CardBody, Col, Button } from "reactstrap";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import MaterialTable from "../../../../components/containers/Tables/MaterialTable/index";
import { UNDERSCORE } from "../../../../constants/utils";
import * as Action from "../../../../redux/actions/hospitalActions";

class HospitalManagementCard extends React.Component {
  componentWillMount() {
    this.props.getHospitalList("all");
	}
	
	_handleEditHospital = (data) => {
		this.context.router.history.push(`/pages/hospitalManagement/editHospital/${data.hospitalPdNumber}`)
	}

	_renderOperation = data => {
    return (
      <Button className="icon" onClick={() => this._handleEditHospital(data)}>
        <span class="lnr lnr-pencil"></span>
      </Button>
    );
  };


  render() {
    const { hospitalList } = this.props;
    const columns = [
      {
        id: "hospitalPdNumber",
        numeric: false,
        disablePadding: true,
        label: "Hospital Id",
        render: text => text.hospitalPdNumber
      },
      {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Hospital Name"
      },
      {
        id: "location",
        numeric: false,
        disablePadding: true,
        label: "Location"
      },
      {
        id: "pincode",
        label: "Pincode",
        numeric: false,
        disablePadding: true
      },
      {
        id: "landmark",
        label: "Landmark",
        numeric: false,
        disablePadding: true
      },
      { label: "Action", render: text => this._renderOperation(text) }
    ];

    return (
      <Col md={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <MaterialTable columns={columns} data={hospitalList} />
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}
function mapStateToProps(state) {
  const hospitalState = state.hospital;
  return {
    hospitalList:
      !UNDERSCORE.isEmpty(hospitalState) &&
      !UNDERSCORE.isEmpty(hospitalState.hospitalList)
        ? hospitalState.hospitalList.hospitals
        : [],
    totalCount:
      !UNDERSCORE.isEmpty(hospitalState) &&
      !UNDERSCORE.isEmpty(hospitalState.hospitalList)
        ? hospitalState.hospitalList.totalRecords
        : 0
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getHospitalList: location => {
      dispatch(Action.getHospitalList(location));
    }
  };
}

HospitalManagementCard.contextTypes = {
  router: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HospitalManagementCard));
