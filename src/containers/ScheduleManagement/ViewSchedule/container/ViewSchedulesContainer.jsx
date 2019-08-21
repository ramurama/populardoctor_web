import React from "react";
import { Card, CardBody, Col, Button } from "reactstrap";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Switch from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";
import MaterialTable from "../../../../components/containers/Tables/MaterialTable";
import RenderSelectField from "../../../../components/shared/components/form/Select";
import { UNDERSCORE } from "../../../../constants/utils";
import * as Action from "../../../../redux/actions/scheduleActions";

class ViewSchedulesContainer extends React.Component {

	componentWillMount() {
    this.props.getDoctorList();
    this.props.getHospitalList();
    this.props.clearScheduleList();
  }

  _renderToggle = text => {
    const color = text.status === "ACTIVE" ? false : true;
    const tooltext = text.status === "ACTIVE" ? "Block" : "Unblock";
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
  _parseList = (dataList, key, id) => {
    return dataList
      ? dataList.map(data => ({
          value: data[key],
          label: data.name,
          id: data[id]
        }))
      : [];
  };

  handleSelect = value => {
    this.setState({ doctorId: value.id });
    this.props.getScheduleList(value.id);
  };
  _handleEditHospital = data => {
    this.context.router.history.push(
      `/pages/scheduleManagement/editSchedule/${data._id}`
    );
  };

  _renderOperation = data => {
    return (
      <div>
        <Button className="icon" onClick={() => this._handleEditHospital(data)}>
          <span class="lnr lnr-pencil" />
        </Button>
      </div>
    );
  };
  render() {
    const { scheduleList } = this.props;
    const doctorList = this._parseList(
      this.props.doctorList,
      "pdNumber",
      "doctorId"
    );
    const columns = [
      {
        label: "Hospital Name",
        numeric: false,
        disablePadding: true,
        render: text => text.hospital.name
      },
      { label: "Weekday", numeric: false, disablePadding: true, id: "weekday" },
      {
        label: "Starttime",
        numeric: false,
        disablePadding: true,
        id: "startTime"
      },
      { label: "Endtime", numeric: false, disablePadding: true, id: "endTime" },
      { label: "Action", render: text => this._renderOperation(text) }
    ];

    return (
      <Col md={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <div style={{ width: 200 }}>
                <RenderSelectField
                  name="doctor"
                  type="text"
                  placeholder="Doctor"
                  width={240}
                  options={doctorList}
                  renderId={true}
                  onChange={value => this.handleSelect(value)}
                  filter={true}
                />
              </div>
            </div>
            <MaterialTable columns={columns} data={scheduleList} />
          </CardBody>
        </Card>
      </Col>
    );
  }
}

function mapStateToProps(state) {
  const scheduleState = state.schedule;
  return {
    doctorList: scheduleState.doctorMasterList,
    scheduleList:
      !UNDERSCORE.isEmpty(scheduleState) &&
      !UNDERSCORE.isEmpty(scheduleState.scheduleList)
        ? scheduleState.scheduleList
        : []
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getDoctorList: () => {
      dispatch(Action.getDoctorList());
    },
    getHospitalList: () => {
      dispatch(Action.getHospitalList());
    },
    getScheduleList: doctorId => {
      dispatch(Action.getScheduleList(doctorId));
    },
    clearScheduleList: () => {
      dispatch(Action.clearScheduleList());
    }
  };
}

ViewSchedulesContainer.contextTypes = {
  router: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewSchedulesContainer));
