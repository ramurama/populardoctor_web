import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { ButtonToolbar, Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import { sendPushMessage } from './commons';

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.message) {
    errors.message = 'Required';
  }
  return errors;
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

  _renderTitleInput = ({ input, meta, label }) => (
    <div className='form__form-group'>
      <span className='form__form-group-label'>{label}</span>
      <div className='form__form-group-field'>
        <input {...input} />
      </div>
      {meta.error && meta.visited && (
        <span style={{ color: 'red' }}>{meta.error}</span>
      )}
    </div>
  );

  _renderMessageInput = ({ input, meta, label }) => (
    <div className='form__form-group'>
      <span className='form__form-group-label'>{label}</span>
      <div className='form__form-group-field'>
        <textarea {...input} />
      </div>
      {meta.error && meta.visited && (
        <span style={{ color: 'red' }}>{meta.error}</span>
      )}
    </div>
  );

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
              <Field
                name='title'
                label='Title'
                component={this._renderTitleInput}
              />
              <Field
                name='message'
                label='Message'
                component={this._renderMessageInput}
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
