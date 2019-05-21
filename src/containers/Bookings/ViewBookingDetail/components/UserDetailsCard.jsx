import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import TextInputDisabled from '../../../../components/custom/TextInputDisabled';
import Moment from 'moment';

const UserDetailCard = props => {
  const { fullName, username, dateOfBirth, gender } = props.data;
  return (
    <Col md={6} lg={6}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">User Details</h5>
          </div>
          <div>
            <form className="form form--horizontal">
              <TextInputDisabled label="Username" value={fullName} />
              <TextInputDisabled label="Mobile" value={username} />
              <TextInputDisabled
                label="DOB"
                value={Moment(dateOfBirth).format('DD-MM-YYYY')}
              />
              <TextInputDisabled label="Gender" value={gender} />
            </form>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default UserDetailCard;
