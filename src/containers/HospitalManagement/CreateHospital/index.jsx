import React from 'react';
import { Container, Row } from 'reactstrap';
import CreateHospitalCard from './components/CreateHospitalCard';


const CreateHospitalPage = () => (
  <Container className='dashboard'>
    <Row>
      <CreateHospitalCard />
    </Row>
  </Container>
);

export default CreateHospitalPage;
