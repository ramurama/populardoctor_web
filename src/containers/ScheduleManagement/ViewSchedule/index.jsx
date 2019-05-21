import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ViewSchedulesCard from './components/ViewSchedulesCard';
import { VIEW_SCHDULES } from '../../../constants/strings';

const ViewSchedulesPage = () => (
  <Container className='dashboard'>
    <Row>
      <Col md={12}>
        <h3 className='page-title'>{VIEW_SCHDULES}</h3>
      </Col>
    </Row>
    <Row>
      <ViewSchedulesCard />
    </Row>
  </Container>
);

export default ViewSchedulesPage;
