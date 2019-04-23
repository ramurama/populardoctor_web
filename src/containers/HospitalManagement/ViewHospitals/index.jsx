import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ViewHospitalCard from './components/ViewHospitalCard';
import { VIEW_HOSPITALS } from '../../../constants/strings';

const ViewHospitalPage = () => (
  <Container className='dashboard'>
    <Row>
      <Col md={12}>
        <h3 className='page-title'>{VIEW_HOSPITALS}</h3>
      </Col>
    </Row>
    <Row>
      <ViewHospitalCard />
    </Row>
  </Container>
);

export default ViewHospitalPage;
