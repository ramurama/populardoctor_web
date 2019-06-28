import React from 'react';
import { Container, Row } from 'reactstrap';
import CreateDoctorCard from './components/CreateDoctorCard';

const CreateDoctorPage = () => (
  <Container className="dashboard">
    <Row>
      <CreateDoctorCard />
    </Row>
  </Container>
);

export default CreateDoctorPage;
