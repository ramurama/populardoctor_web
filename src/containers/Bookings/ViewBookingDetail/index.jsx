import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import BookingDetailCard from './components/BookingDetailCard';
import UserDetailCard from './components/UserDetailsCard';
import DoctorDetailCard from './components/DoctorDetailsCard';
import HospitalDetailCard from './components/HospitalDetailsCard';
import Endpoints from '../../../redux/actions/endpoints';
import _ from 'underscore';

class ViewBookingDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingDetail: null
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    fetch(
      Endpoints.getBookingDetail + '/' + this.props.location.state.bookingId
    )
      .then(res => res.json())
      .then(bookingDetail => {
        console.log(bookingDetail);
        this.setState({ bookingDetail });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { bookingDetail } = this.state;
    return (
      <Container className="dashboard">
        <Row>
          <Col md={12}>
            <h3 className="page-title">
              {'Booking ID: ' + this.props.location.state.bookingId}
            </h3>
          </Col>
        </Row>
        {!_.isNull(this.state.bookingDetail) && (
          <div>
            <Row>
              <BookingDetailCard data={bookingDetail} />
              <UserDetailCard data={bookingDetail.userDetails} />
            </Row>
            <Row>
              <DoctorDetailCard data={bookingDetail.doctorDetails} />
              <HospitalDetailCard data={bookingDetail.hospitalDetails} />
            </Row>
          </div>
        )}
      </Container>
    );
  }
}

export default ViewBookingDetailPage;
