import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import CreateFrontdeskUserForm from './components/CreateFrontdeskUserForm';
import Snackbar from '@material-ui/core/Snackbar';

class CreateFrontdeskUsersPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayToast: false,
      displayMessage: ''
    };
  }

  _displayToast = status => {};

  render() {
    return (
      <Container className="dashboard">
        <Row>
          <Col md={12}>
            <h3 className="page-title">Front-Desk User</h3>
          </Col>
        </Row>
        <Row>
          <CreateFrontdeskUserForm afterCreate={this._displayToast} />
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

export default CreateFrontdeskUsersPage;
