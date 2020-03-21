import React, { Component } from "react";
import { Card, CardBody, Col } from "reactstrap";
import { connect } from "react-redux";
import MaterialTable from "../../../../components/containers/Tables/MaterialTable";
import UserBlockToggle from "../../../../components/user/userBlockToggle";
import { UNDERSCORE } from "../../../../constants/utils";
import * as Action from "../../../../redux/actions/frontdeskActions";

class FrontdeskUsersTable extends Component {
  componentWillMount() {
    this.props.getFdUserList();
  }
  getColumns = props => {
    return [
      { id: "fullName", numeric: false, disablePadding: true, label: "Name" },
      {
        id: "username",
        numeric: false,
        disablePadding: true,
        label: "Contact"
      },
      {
        id: "action",
        label: "Block/Unblock",
        render: row => (
          <UserBlockToggle
            data={row}
            status={row.status}
            id={row._id}
            loadData={() => props.refreshTable()}
            afterToggle={value => props.onActionComplete(value)}
          />
        )
      }
    ];
  };
  render() {
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            {/* <div className="card__title">
            <h5 className="bold-text">Previous Announcements</h5>
          </div> */}
            <MaterialTable
              columns={this.getColumns(this.props)}
              data={this.props.fdUserList}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}
function mapStateToProps(state) {
  const fduserState = state.fduser;
  console.log();
  return {
    fdUserList:
      fduserState.fdUserList && fduserState.fdUserList.users
        ? fduserState.fdUserList.users
        : []
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getFdUserList: () => {
      dispatch(Action.getFdUserList());
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontdeskUsersTable);
