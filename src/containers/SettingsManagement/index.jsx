import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ChangePasswordCard from './components/ChangePasswordCard';

const SettingsPage = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Settings</h3>
      </Col>
    </Row>
    <Row>
      <ChangePasswordCard />
    </Row>
  </Container>
);

export default SettingsPage;
