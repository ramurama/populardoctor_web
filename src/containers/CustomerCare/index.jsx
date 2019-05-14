import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import CustomerCareForm from './components/CustomerCareForm';
import { CUSTOMER_CARE } from '../../constants/strings';

const CustomerCarePage = () => (
  <Container className='dashboard'>
    <Row>
      <Col md={12}>
        <h3 className='page-title'>{CUSTOMER_CARE}</h3>
      </Col>
    </Row>
    <Row>
      <CustomerCareForm />
    </Row>
  </Container>
);

export default CustomerCarePage;
