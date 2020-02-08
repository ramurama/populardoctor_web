import React from 'react';
import { Card, CardBody, Col, Button, ButtonToolbar } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import Endpoints from '../../../../redux/actions/endpoints';
import PropTypes from 'prop-types';

const renderTextInput = ({
  input,
  label,
  meta: { touched, error },
  type,
  placeholder
}) => (
  <div className='form__form-group'>
    <span className='form__form-group-label'>{label}</span>
    <div className='form__form-group-field'>
      <div className='form__form-group-input-wrap'>
        <input {...input} type={type} placeholder={placeholder} />
        {error && touched && (
          <span className='form__form-group-error'>{error}</span>
        )}
      </div>
    </div>
  </div>
);

renderTextInput.propTypes = {
  input: PropTypes.shape().isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string
  }),
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};

const _validateForm = values => {
  const errors = {};
  if (!values.mobile) {
    errors.mobile = "Mobile number can't be empty";
  }
  if (!values.fullName) {
    errors.fullName = "Name can't be empty";
  }
  return errors;
};

class CreateFrontdeskUserCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _handleSubmit = ({ mobile, fullName }) => {
    const password = mobile;
    fetch(Endpoints.createFrontdeskUser, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ mobile, password, fullName })
    })
      .then(res => res.json())
      .then(res => {
        const { reset, onResponse } = this.props;
        if (res.status) {
          reset();
        }
        onResponse(res);
      })
      .catch(err => console.error(err));
  };

  render() {
    const { pristine, reset, submitting, handleSubmit } = this.props;
    return (
      <Col md={6}>
        <Card>
          <CardBody>
            <div className='card__title'>
              <h5 className='bold-text'>Create Front-Desk User</h5>
            </div>
            <form
              className='form form--horizontal'
              onSubmit={handleSubmit(this._handleSubmit)}
            >
              <Field
                name='mobile'
                type='text'
                placeholder='Mobile'
                label='Mobile'
                component={renderTextInput}
              />
              <Field
                name='fullName'
                type='text'
                placeholder='Full Name'
                label='Full Name'
                component={renderTextInput}
              />

              <ButtonToolbar className='form__button-toolbar'>
                <Button
                  color='primary'
                  type='submit'
                  disabled={pristine || submitting}
                >
                  Create
                </Button>
                <Button
                  type='button'
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

export default reduxForm({
  form: 'create_frontdeskuser_form',
  validate: _validateForm
})(withTranslation('common')(CreateFrontdeskUserCard));
