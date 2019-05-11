import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import AnnouncementForm from './AnnouncementForm';

const ExampleCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <AnnouncementForm />
      </CardBody>
    </Card>
  </Col>
);

export default ExampleCard;
