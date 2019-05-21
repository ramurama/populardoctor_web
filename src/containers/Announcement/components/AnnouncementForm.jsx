import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { ButtonToolbar, Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import validate from '../../../components/Form/FormValidation/components/validate';
import { sendPushMessage } from './commons';

const announcementForm = {
  title: {
    type: 'text',
    emptyField: 'Field cannot be empty',
    length: 40
  },
  message: {
    type: 'text',
    emptyField: 'Field cannot be empty'
  }
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
      this.props.afterPush(httpStatus);
    });
  };

  _validateInputs = () => {};

  render() {
    const { pristine, reset, submitting, handleSubmit } = this.props;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <form
              className="form form--horizontal"
              onSubmit={handleSubmit(this._handleSubmit)}
            >
              <div className="form__form-group">
                <span className="form__form-group-label">Title</span>
                <div className="form__form-group-field">
                  <Field
                    name="title"
                    component="input"
                    type="text"
                    placeholder="Title"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Message</span>
                <div className="form__form-group-field">
                  <Field name="message" component="textarea" type="text" />
                </div>
              </div>
              <ButtonToolbar className="form__button-toolbar">
                <Button color="primary" type="submit">
                  Send
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

export default reduxForm({ form: 'announcement_form' })(
  withTranslation('common')(AnnouncementForm)
);
