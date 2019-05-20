import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import MaterialTable from '../../../components/containers/Tables/MaterialTable';

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
