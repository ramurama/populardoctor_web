import React from 'react';
import { Card, CardBody, Col, Button } from 'reactstrap';
import TextInputDisabled from '../../../../components/custom/TextInputDisabled';
import Moment from 'moment-timezone';
import _ from 'underscore';

const BookingDetailCard = props => {
  const { bookingId, tokenDate, token, bookedTimeStamp, status } = props.data;
  let statusColor = 'green';
  switch (status) {
    case 'CANCELLED':
      statusColor = 'red';
      break;
    case 'BOOKED':
      statusColor = 'orange';
      break;
    case 'VISITED':
      statusColor = 'green';
      break;
  }
  return (
    <Col md={6} lg={6}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Booking Details</h5>
          </div>
          <div>
            <form className="form form--horizontal">
              <TextInputDisabled
                label="Token Date"
                value={Moment(tokenDate).format('DD-MM-YYYY')}
              />
              {!_.isEqual(token.number, 0) && (
                <TextInputDisabled label="Token Number" value={token.number} />
              )}
              <TextInputDisabled label="Token Type" value={token.type} />
              {!_.isEqual(token.number, 0) && (
                <TextInputDisabled label="Token Time" value={token.time} />
              )}
              <TextInputDisabled
                label="Booked Time"
                value={Moment(bookedTimeStamp)
                  .tz('Asia/Calcutta')
                  .format('DD-MM-YYYY HH:mm:ss')}
              />
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h3 className="bold-text" style={{ color: statusColor }}>
                  {status}
                </h3>
              </div>
            </form>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default BookingDetailCard;
