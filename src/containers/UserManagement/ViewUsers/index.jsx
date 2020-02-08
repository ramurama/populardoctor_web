import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ViewUsersContainer from './container/ViewUsersContainer';
import { VIEW_USERS } from '../../../constants/strings';

const ViewUsersPage = () => (
  <Container className='dashboard'>
    <Row>
      <Col md={12}>
        <h3 className='page-title'>{VIEW_USERS}</h3>
      </Col>
    </Row>
    <Row>
      <ViewUsersContainer />
    </Row>
  </Container>
);

export default ViewUsersPage;
