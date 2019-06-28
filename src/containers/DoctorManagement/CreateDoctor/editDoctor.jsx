import React from 'react';
import { Container, Row } from 'reactstrap';
import CreateDoctorCard from './components/CreateDoctorCard';

const EditDoctor = () => (
  <Container className="dashboard">
    <Row>
      <CreateDoctorCard />
    </Row>
  </Container>
);

export default EditDoctor;
