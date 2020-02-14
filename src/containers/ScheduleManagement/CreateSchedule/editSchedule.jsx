import React from 'react';
import { Container, Row } from 'reactstrap';
import CreateScheduleCard from './components/CreateScheduleCard';


const EditSchedulePage = () => (
  <Container className='dashboard'>
    <Row>
      <CreateScheduleCard />
    </Row>
  </Container>
);

export default EditSchedulePage;