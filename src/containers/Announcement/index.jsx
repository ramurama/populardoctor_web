import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import AnnouncementCard from './components/AnnouncementCard';
import { ANNOUNCEMENT } from '../../constants/strings';
import AnnouncementsTable from './components/AnnouncementsTable';
import Endpoint from '../../redux/actions/endpoints';
import Moment from 'moment-timezone';

class AnnouncementPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: []
    };
  }
  componentDidMount() {
    this._fetchAnnouncements();
  }

  _fetchAnnouncements() {
    fetch(Endpoint.getAnnouncements)
      .then(res => res.json())
      .then(announcementsData => {
        const announcements = announcementsData.map(announcement => {
          const date = Moment.tz(announcement.date, 'Asia/Calcutta').format(
            'DD/MMM/YYYY hh:mm:ss'
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
          <AnnouncementCard />
        </Row>
        <Row>
          <AnnouncementsTable data={this.state.announcements} />
        </Row>
      </Container>
    );
  }
}

export default AnnouncementPage;
