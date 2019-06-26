import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import CreateDoctorCard from './components/CreateDoctorCard';
import { CREATE_DOCTOR } from '../../../constants/strings';

const CreateDoctorPage = () => (
  <Container className="dashboard">
    <Row>
      <CreateDoctorCard />
    </Row>
  </Container>
);

export default CreateDoctorPage;
