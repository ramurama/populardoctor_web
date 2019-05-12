import React from 'react';
import { Col, Container, Row, ButtonToolbar } from 'reactstrap';
import AnnouncementForm from './components/AnnouncementForm';
import { ANNOUNCEMENT } from '../../constants/strings';
import AnnouncementsTable from './components/AnnouncementsTable';
import Endpoint from '../../redux/actions/endpoints';
import Moment from 'moment-timezone';
import { sendPushMessage } from './components/commons';
import Snackbar from '@material-ui/core/Snackbar';
import _ from 'underscore';
import Modal from '../../components/custom/Modal';

class AnnouncementPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: [],
      displayToast: false,
      displayMessage: ''
    };
  }
  componentDidMount() {
    this._fetchAnnouncements();
  }

  _displayToast(httpStatus) {
    if (_.isEqual(httpStatus, 200)) {
      this.setState({
        displayToast: true,
        displayMessage: 'Message sent successfully'
      });
    } else {
      this.setState({
        displayToast: true,
        displayMessage: 'Error sending message!'
      });
    }
  }

  _fetchAnnouncements() {
    fetch(Endpoint.getAnnouncements)
      .then(res => res.json())
      .then(announcementsData => {
        const announcements = announcementsData.map(announcement => {
          const date = Moment.tz(announcement.date, 'Asia/Calcutta').format(
            'DD-MMM-YYYY HH:mm:ss'
          );
          return {
            ...announcement,
            date
          };
        });
        this.setState({ announcements });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <Container className="dashboard">
        <Row>
          <Col md={12}>
            <h3 className="page-title">{ANNOUNCEMENT}</h3>
          </Col>
        </Row>
        <Row>
          <AnnouncementForm
            afterPush={httpStatus => {
              this._displayToast(httpStatus);
            }}
          />
        </Row>
        <Row>
          <AnnouncementsTable
            data={this.state.announcements}
            onResendClick={(title, body) => {
              sendPushMessage(title, body, httpStatus => {
                this._displayToast(httpStatus);
              });
            }}
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

export default AnnouncementPage;
