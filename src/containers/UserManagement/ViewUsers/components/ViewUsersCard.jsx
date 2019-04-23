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
import * as Action from "../../../../redux/actions/userActions";

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
class UserManagementCard extends React.Component {
  componentWillMount() {
    this.props.getUserList();
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
      { id: 'id', numeric: false, disablePadding: true, label: '#' },
      { id: 'fullName', numeric: false, disablePadding: true, label: 'Name' },
      { id: 'username', numeric: false, disablePadding: true, label: 'Contact' },
      { id: 'gender', numeric: false, disablePadding: true, label: 'Gender' },
      { id: 'action', label: 'Operation', render : (text) => this._renderToggle(text)},

    ];

    return (
      <Col md={12}>
        <Card style={{ height: '80vh'}}>
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
