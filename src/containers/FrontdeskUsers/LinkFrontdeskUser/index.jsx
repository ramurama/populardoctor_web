import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import LinkFrontdeskUsersCard from './components/LinkFrontdeskUsersCard';

const LinkFrontdeskUsersPage = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Link Front-Desk User</h3>
      </Col>
    </Row>
    <Row>
      <LinkFrontdeskUsersCard />
    </Row>
  </Container>
);

export default LinkFrontdeskUsersPage;
