import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ViewUsersCard from './components/ViewUsersCard';
import { VIEW_USERS } from '../../../constants/strings';

const ViewUsersPage = () => (
  <Container className='dashboard'>
    <Row>
      <Col md={12}>
        <h3 className='page-title'>{VIEW_USERS}</h3>
      </Col>
    </Row>
    <Row>
      <ViewUsersCard />
    </Row>
  </Container>
);

export default ViewUsersPage;
