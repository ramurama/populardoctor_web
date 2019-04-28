import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import * as Action from '../../redux/actions/userActions';

class UserBlockToggle extends React.Component{

	_handleToggle = (status) => {
		const { id } = this.props;
		if(status === 'ACTIVE') {
			return this.props.blockUser({userId: id})
			.then(() => {
				this.props.afterToggle({
					show: true,
					userStatus: 'Blocked',
					message: 'Now the Doctor is not visible to customer and frontdesk',
				})
				this.props.loadData();
			});
		}else{
			return this.props.unblockUser({userId: id})
			.then(() => {
				this.props.afterToggle({
					show: true,
					userStatus: 'Blocked',
					message: 'Now the Doctor is not visible to customer and frontdesk',
				})
				this.props.loadData();
			});
		}
	}

	render(){
		const { status } = this.props;
		const toolText = status === 'ACTIVE' ? 'block' : 'unblock';
		const color = status === 'ACTIVE' ? true: false;
		return (
		<Container>
			<Tooltip title={toolText}>
				<Switch
					checked={color}
					onChange={()=> this._handleToggle(status)}
					value="checkedB"
					color="primary"
				/>
			</Tooltip>
		</Container>);
	}
}
function mapStateToProps(state){
	return {
	};
}
function mapDispatchToProps (dispatch) {
  return {
    blockUser: (userId) => {
      return Action.blockUser(userId);
		},
		unblockUser: (userId) => {
      return Action.unblockUser(userId);
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserBlockToggle);
