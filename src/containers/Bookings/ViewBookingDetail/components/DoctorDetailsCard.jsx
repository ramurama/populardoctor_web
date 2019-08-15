import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import TextInputDisabled from '../../../../components/custom/TextInputDisabled';

const DoctorDetailCard = props => {
  const {
    fullName,
    specialization,
    yearsOfExperience,
    degree,
    username,
    gender
  } = props.data;
  return (
    <Col md={6} lg={6}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Doctor Details</h5>
          </div>
          <div>
            <form className="form form--horizontal">
              <TextInputDisabled label="Doctor Name" value={fullName} />
              <TextInputDisabled
                label="Specialization"
                value={specialization}
              />
              <TextInputDisabled
                label="Years of Experience"
                value={yearsOfExperience}
              />
              <TextInputDisabled label="Degree" value={degree} />
              <TextInputDisabled label="Mobile" value={username} />
              <TextInputDisabled label="Gender" value={gender} />
            </form>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default DoctorDetailCard;
