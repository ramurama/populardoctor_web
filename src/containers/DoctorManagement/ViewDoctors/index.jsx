import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ViewDoctorsContainer from './container/ViewDoctorsContainer';

const ExamplePage = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Doctor Management</h3>
      </Col>
    </Row>
    <Row>
      <ViewDoctorsContainer />
    </Row>
  </Container>
);

export default ExamplePage;
