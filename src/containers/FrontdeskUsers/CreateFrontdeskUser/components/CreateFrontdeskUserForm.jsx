import React from 'react';
import { Card, CardBody, Col, Button, ButtonToolbar, Row } from 'reactstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { withTranslation } from 'react-i18next';

class CreateFrontdeskUserCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _handleSubmit = ({ mobile, fullName }) => {
    
  };

  render() {
    const { pristine, reset, submitting, handleSubmit } = this.props;
    return (
      <Col md={6}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Create Front-Desk User</h5>
            </div>
            <form
              className="form form--horizontal"
              onSubmit={handleSubmit(this._handleSubmit)}
            >
              <div className="form__form-group">
                <span className="form__form-group-label">Mobile</span>
                <div className="form__form-group-field">
                  <Field
                    name="mobile"
                    component="input"
                    type="number"
                    placeholder="Mobile"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Full Name</span>
                <div className="form__form-group-field">
                  <Field
                    name="fullName"
                    component="input"
                    type="text"
                    placeholder="Full Name"
                  />
                </div>
              </div>

              <ButtonToolbar className="form__button-toolbar">
                <Button color="primary" type="submit">
                  Create
                </Button>
                <Button
                  type="button"
                  onClick={reset}
                  disabled={pristine || submitting}
                >
                  Clear
                </Button>
              </ButtonToolbar>
            </form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default reduxForm({ form: 'create_frontdeskuser_form' })(
  withTranslation('common')(CreateFrontdeskUserCard)
);
