import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import CreateDoctorCard from './components/CreateDoctorCard';
import { CREATE_DOCTOR } from '../../../constants/strings';

const CreateDoctorPage = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">{CREATE_DOCTOR}</h3>
      </Col>
    </Row>
    <Row>
      <CreateDoctorCard />
    </Row>
  </Container>
);

export default CreateDoctorPage;
