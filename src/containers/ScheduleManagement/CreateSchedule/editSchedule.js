import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import CreateScheduleCard from './components/CreateScheduleCard';


const EditSchedulePage = () => (
  <Container className='dashboard'>
    <Row>
      <CreateScheduleCard />
    </Row>
  </Container>
);

export default EditSchedulePage;
