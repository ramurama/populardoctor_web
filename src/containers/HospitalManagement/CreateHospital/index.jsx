import React from "react";
import { Container, Col, Row } from "reactstrap";
import CreateHospitalCard from "./components/CreateHospitalCard";

const CreateHospitalPage = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Create Hospital</h3>
      </Col>
			<CreateHospitalCard />
    </Row>
  </Container>
);

export default CreateHospitalPage;
