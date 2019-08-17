import React from "react";
import { Card, CardBody, Col } from "reactstrap";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import MaterialTable from "../../../../components/containers/Tables/MaterialTable/index";
import { UNDERSCORE } from "../../../../constants/utils";
import * as Action from "../../../../redux/actions/userActions";
import UserBlockToggle from "../../../../components/user/userBlockToggle";

class UserManagementCard extends React.Component {

  componentWillMount() {
    this._onLoad();
  }

	_onLoad = () => {
		this.props.getUserList();
	} 

	_handleNotification = (value) =>{
		alert()
		this.setState({...value});
	}

	_renderToggle = (row) => {
		return (
			<UserBlockToggle
				data={row}
				status={row.status}
				id={row._id}
				loadData={this._onLoad}
				afterToggle={(value) => this._handleNotification(value)}
			/>
		)
	}

  render() {
    const { userDataList } = this.props;
    const columns = [
      { id: 'fullName', numeric: false, disablePadding: true, label: 'Name' },
      { id: 'username', numeric: false, disablePadding: true, label: 'Contact' },
      { id: 'gender', numeric: false, disablePadding: true, label: 'Gender' },
      { id: 'action', label: 'Block/Unblock', render : (text) => this._renderToggle(text)},

    ];

    return (
      <Col md={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <MaterialTable columns={columns} data={userDataList} />
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}
function mapStateToProps(state){
	const userState = state.user ? state.user.customerList : [];
	return {
		userDataList: !UNDERSCORE.isEmpty(userState) ? userState.users : [],
		totalCount: !UNDERSCORE.isEmpty(userState) ? userState.totalRecords : 0,
	};
}
function mapDispatchToProps (dispatch) {
  return {
    getUserList: () => {
      dispatch(Action.getCustomerList());
    }
  }
}


UserManagementCard.contextTypes = {
  router: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserManagementCard));
