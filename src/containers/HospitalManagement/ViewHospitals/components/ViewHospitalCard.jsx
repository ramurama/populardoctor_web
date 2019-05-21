import React from "react";
import { Card, CardBody, Col } from "reactstrap";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import Switch from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";
import MaterialTable from "../../../../components/containers/Tables/MaterialTable/index";
import { UNDERSCORE } from "../../../../constants/utils";
import * as Action from "../../../../redux/actions/hospitalActions";

const styles = {
  avatar: {
    margin: 10
  },
  inactive: {
    color: "white",
    background: "#ea5555"
  },
  active: {
    background: "#33bd33",
    color: "white"
  }
};
class HospitalManagementCard extends React.Component {
  componentWillMount() {
    this.props.getHospitalList("all");
  }

  renderAvatar = text => (
    <div style={{ display: "flex", width: 200 }}>
      <Avatar
        alt="L"
        src={text.doctorDetails.profileImage}
        classes={styles.avatar}
      />
      <a style={{ padding: 20 }}>
        <strong>{text.doctorDetails.fullName}</strong>
      </a>
    </div>
  );

  _renderToggle = text => {
    const color = text.doctorDetails.status === "ACTIVE" ? false : true;
    const tooltext =
      text.doctorDetails.status === "ACTIVE" ? "Block" : "Unblock";
    return (
      <Tooltip title={tooltext}>
        <Switch
          checked={color}
          onChange={() => this.handleToggle(text)}
          value="checkedB"
          color="primary"
        />
      </Tooltip>
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
      }
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
