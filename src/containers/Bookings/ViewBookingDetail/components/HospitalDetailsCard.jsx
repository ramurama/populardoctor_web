import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import TextInputDisabled from '../../../../components/custom/TextInputDisabled';

const HospitalDetailCard = props => {
  const { name, address, location, pincode } = props.data;
  return (
    <Col md={6} lg={6}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Hospital Details</h5>
          </div>
          <div>
            <form className="form form--horizontal">
              <TextInputDisabled label="Hospital Name" value={name} />
              <TextInputDisabled label="Address" value={address} />
              <TextInputDisabled label="Location" value={location} />
              <TextInputDisabled label="Pin Code" value={pincode} />
            </form>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default HospitalDetailCard;
