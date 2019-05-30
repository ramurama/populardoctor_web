import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Snackbar from '@material-ui/core/Snackbar';
import CreateFrontdeskUserForm from './components/CreateFrontdeskUserForm';
import LinkFrontdeskUserForm from './components/LinkFrontdeskUserForm';
import Endpoints from '../../../redux/actions/endpoints';

const frontdeskUsersPromise = new Promise((resolve, reject) => {
  fetch(Endpoints.getFrontdeskUsersMasterList)
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err));
});

class CreateFrontdeskUsersPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayToast: false,
      toastMessage: '',
      frontdeskUsers: []
    };
  }

  componentDidMount() {
    this._fetchFrontdeskUsers();
  }

  _fetchFrontdeskUsers() {
    Promise.all([frontdeskUsersPromise])
      .then(data => {
        const frontdeskUsers = data[0].map(fdu => {
          const { frontdeskUserId, name, mobile } = fdu;
          return { label: `${mobile} - ${name}`, value: frontdeskUserId };
        });
        this.setState({ frontdeskUsers });
      })
      .catch(err => console.error(err));
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
            onResponse={res => {
              this._displayToast(res.message);
              //refresh frontdesk users
              if (res.status) {
                //for populating the select field in LinkFrontdeskUser form
                const frontdeskUsers = res.frontdeskUsers.map(fdu => {
                  const { frontdeskUserId, name, mobile } = fdu;
                  return {
                    label: `${name}(${mobile})`,
                    value: frontdeskUserId
                  };
                });
                this.setState({ frontdeskUsers });
              }
            }}
          />
          <LinkFrontdeskUserForm
            frontdeskUsersList={this.state.frontdeskUsers}
            onResponse={res => {
              if (res.status) {
                this._displayToast('Linked successfully');
              }
            }}
          />
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
