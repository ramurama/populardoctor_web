import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { ButtonToolbar, Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import { sendPushMessage } from './commons';
import PropTypes from 'prop-types';

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = "Title shouldn't be empty";
  }
  if (!values.message) {
    errors.message = "Message shouldn't be empty";
  }
  return errors;
};

const _renderTitleInput = ({ input, meta: { touched, error }, label }) => (
  <div className='form__form-group'>
    <span className='form__form-group-label'>{label}</span>
    <div className='form__form-group-field'>
      <div className='form__form-group-input-wrap'>
        <input {...input} />
        {error && touched && (
          <span className='form__form-group-error'>{error}</span>
        )}
      </div>
    </div>
  </div>
);

_renderTitleInput.propTypes = {
  input: PropTypes.shape().isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string
  }),
  label: PropTypes.string.isRequired
};

const _renderMessageInput = ({ input, meta: { touched, error }, label }) => (
  <div className='form__form-group'>
    <span className='form__form-group-label'>{label}</span>
    <div className='form__form-group-field'>
      <div className='form__form-group-input-wrap'>
        <textarea {...input} />
        {error && touched && (
          <span className='form__form-group-error'>{error}</span>
        )}
      </div>
    </div>
  </div>
);

_renderMessageInput.propTypes = {
  input: PropTypes.shape().isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string
  }),
  label: PropTypes.string.isRequired
};

class AnnouncementForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayToast: false,
      displayMessage: ''
    };
  }

  _handleSubmit = ({ title, message }) => {
    sendPushMessage(title, message, httpStatus => {
      this.props.reset();
      this.props.afterPush(httpStatus);
    });
  };

  render() {
    const { pristine, reset, submitting, handleSubmit } = this.props;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <form
              className='form form--horizontal'
              onSubmit={handleSubmit(this._handleSubmit)}
            >
              <Field name='title' label='Title' component={_renderTitleInput} />
              <Field
                name='message'
                label='Message'
                component={_renderMessageInput}
              />
              <ButtonToolbar className='form__button-toolbar'>
                <Button
                  color='primary'
                  type='submit'
                  disabled={pristine || submitting}
                >
                  Send
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

export default reduxForm({ form: 'announcement_form', validate })(
  withTranslation('common')(AnnouncementForm)
);
