import React from 'react';
import { Card, CardBody, Col, Button } from 'reactstrap';
import MaterialTable from '../../../components/containers/Tables/MaterialTable';
import SendIcon from 'mdi-react/SendIcon';
import { Link } from 'react-router-dom';

const AnnouncementsTable = props => {
  const columns = [
    {
      id: 'date',
      label: 'Date'
    },
    {
      id: 'title',
      label: 'Title'
    },
    {
      id: 'body',
      label: 'Message'
    },
    {
      id: 'action',
      label: 'Action',
      render: row => {
        return (
          <a onClick={() => props.onResendClick(row.title, row.body)}>
            <SendIcon color="#304ffe" />
          </a>
        );
      }
    }
  ];
  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Previous Announcements</h5>
          </div>
          <MaterialTable columns={columns} data={props.data} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default AnnouncementsTable;
