import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import CreateFrontdeskUsersCard from './components/CreateFrontdeskUsersCard';

const CreateFrontdeskUsersPage = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Create Front-Desk User</h3>
      </Col>
    </Row>
    <Row>
      <CreateFrontdeskUsersCard />
    </Row>
  </Container>
);

export default CreateFrontdeskUsersPage;
