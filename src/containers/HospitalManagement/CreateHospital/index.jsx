import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import CreateHospitalCard from './components/CreateHospitalCard';
import { CREATE_HOSPITAL } from '../../../constants/strings';

const CreateHospitalPage = () => (
  <Container className='dashboard'>
    <Row>
      <Col md={12}>
        <h3 className='page-title'>{CREATE_HOSPITAL}</h3>
      </Col>
    </Row>
    <Row>
      <CreateHospitalCard />
    </Row>
  </Container>
);

export default CreateHospitalPage;
