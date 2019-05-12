import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import MaterialTable from '../../../../components/containers/Tables/MaterialTable';
import CloseCircleIcon from 'mdi-react/CloseCircleIcon';
import CheckIcon from 'mdi-react/CheckIcon';
import TicketConfirmation from 'mdi-react/TicketPercentIcon';
import EyeIcon from 'mdi-react/EyeIcon';
import { Link } from 'react-router-dom';
import { ROUTE_VIEW_BOOKING_DETAIL } from '../../../../constants/routes';

const ViewBookingsTable = props => {
  const columns = [
    {
      id: 'bookingId',
      label: 'Booking ID'
    },
    {
      id: 'tokenDate',
      label: 'Date'
    },

    {
      id: 'status',
      label: 'Status',
      render: row => {
        let icon = null;
        switch (row.status) {
          case 'CANCELLED':
            icon = <CloseCircleIcon color="#ff1744" />;
            break;
          case 'BOOKED':
            icon = <TicketConfirmation color="#f57f17" />;
            break;
          case 'VISITED':
            icon = <CheckIcon color="#2e7d32" />;
            break;
        }
        return icon;
      }
    },
    {
      id: 'username',
      label: 'Username'
    },
    {
      id: 'doctorName',
      label: 'Doctor Name'
    },
    {
      id: 'location',
      label: 'Location'
    },
    {
      id: 'bookingId',
      label: 'View',
      render: row => {
        return (
          <Link
            to={{
              pathname: ROUTE_VIEW_BOOKING_DETAIL,
              state: { bookingId: row.bookingId }
            }}
          >
            <EyeIcon color="#304ffe" />
          </Link>
        );
      }
    }
  ];
  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <MaterialTable columns={columns} data={props.data} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default ViewBookingsTable;
