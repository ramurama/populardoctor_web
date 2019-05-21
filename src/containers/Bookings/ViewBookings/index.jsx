import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ViewBookingsTable from './components/ViewBookingsTable';
import { BOOKINGS } from '../../../constants/strings';
import Endpoints from '../../../redux/actions/endpoints';
import Moment from 'moment-timezone';

class ViewBookingsTablePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: []
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    fetch(Endpoints.getBookings)
      .then(res => res.json())
      .then(bookings => {
        const destructedBookings = bookings.map(booking => {
          const {
            doctorDetails,
            hospitalDetails,
            userDetails,
            tokenDate
          } = booking;
          return {
            ...booking,
            doctorName: doctorDetails.fullName,
            specialization: doctorDetails.specialization,
            hospitalName: hospitalDetails.name,
            location: hospitalDetails.location,
            username: userDetails.fullName,
            tokenDate: Moment(tokenDate)
              .tz('Asia/Calcutta')
              .format('DD-MM-YYYY')
          };
        });
        this.setState({ bookings: destructedBookings });
      })
      .catch(err => console.error(err));
  }

  render() {
    console.log(this.state.bookings);
    return (
      <Container className="dashboard">
        <Row>
          <Col md={12}>
            <h3 className="page-title">{BOOKINGS}</h3>
          </Col>
        </Row>
        <Row>
          <ViewBookingsTable
            data={this.state.bookings}
          />
        </Row>
      </Container>
    );
  }
}

export default ViewBookingsTablePage
