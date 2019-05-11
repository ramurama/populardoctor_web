import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import FrontdeskUsersTable from './components/FrontdeskUsersTable';
import Endpoints from '../../../redux/actions/endpoints';
import Snackbar from '@material-ui/core/Snackbar';

class ViewFrontdeskUsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frontdeskUsersList: [],
      displayToast: false,
      displayMessage: ''
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    fetch(Endpoints.getFrontdeskList)
      .then(res => res.json())
      .then(res => {
        this.setState({ frontdeskUsersList: res.users });
      })
      .catch(err => console.error(err));
  }

  _onActionComplete(displayMessage) {
    console.log(displayMessage)
  }

  render() {
    return (
      <Container className="dashboard">
        <Row>
          <Col md={12}>
            <h3 className="page-title">Front-Desk Users</h3>
          </Col>
        </Row>
        <Row>
          <FrontdeskUsersTable
            data={this.state.frontdeskUsersList}
            refreshTable={() => this._fetchData()}
            onActionComplete={value => this._onActionComplete(value)}
          />
        </Row>
        {this.state.displayToast && (
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={3000}
            open={this.state.displayToast}
            ContentProps={{
              'aria-describedby': 'message-id'
            }}
            onClose={() => this.setState({ displayToast: false })}
            message={<span id="message-id">{this.state.displayMessage}</span>}
          />
        )}
      </Container>
    );
  }
}

export default ViewFrontdeskUsersPage;
