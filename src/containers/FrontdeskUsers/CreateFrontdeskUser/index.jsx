import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Snackbar from '@material-ui/core/Snackbar';
import CreateFrontdeskUserForm from './components/CreateFrontdeskUserForm';
import LinkFrontdeskUserForm from './components/LinkFrontdeskUserForm';

class CreateFrontdeskUsersPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayToast: false,
      toastMessage: ''
    };
  }

  _displayToast = toastMessage => {
    this.setState({
      displayToast: true,
      toastMessage
    });
  };

  render() {
    return (
      <Container className='dashboard'>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>Front-Desk User</h3>
          </Col>
        </Row>
        <Row>
          <CreateFrontdeskUserForm
            onResponse={res => this._displayToast(res.message)}
          />
          <LinkFrontdeskUserForm />
        </Row>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={3000}
          open={this.state.displayToast}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          onClose={() => this.setState({ displayToast: false })}
          message={<span id='message-id'>{this.state.toastMessage}</span>}
        />
      </Container>
    );
  }
}

export default CreateFrontdeskUsersPage;
