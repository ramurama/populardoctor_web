import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import CreateScheduleCard from './components/CreateScheduleCard';
import { CREATE_SCHEDULE } from '../../../constants/strings';

const CreateSchedulePage = () => (
  <Container className='dashboard'>
    <Row>
      <Col md={12}>
        <h3 className='page-title'>{CREATE_SCHEDULE}</h3>
      </Col>
    </Row>
    <Row>
      <CreateScheduleCard />
    </Row>
  </Container>
);

export default CreateSchedulePage;
