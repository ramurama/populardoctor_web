import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ViewHospitalsContainer from './container/ViewHospitalsContainer';
import { VIEW_HOSPITALS } from '../../../constants/strings';

const ViewHospitalPage = () => (
  <Container className='dashboard'>
    <Row>
      <Col md={12}>
        <h3 className='page-title'>{VIEW_HOSPITALS}</h3>
      </Col>
    </Row>
    <Row>
      <ViewHospitalsContainer />
    </Row>
  </Container>
);

export default ViewHospitalPage;
