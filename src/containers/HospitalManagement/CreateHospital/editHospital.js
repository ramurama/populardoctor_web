import React from 'react';
import { Container, Row } from 'reactstrap';
import CreateHospitalCard from './components/CreateHospitalCard';


const EditHospitalPage = () => (
  <Container className='dashboard'>
    <Row>
      <CreateHospitalCard />
    </Row>
  </Container>
);

export default EditHospitalPage;
