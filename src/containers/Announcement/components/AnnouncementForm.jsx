import React from 'react';
import { ButtonToolbar, Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import validate from '../../../components/Form/FormValidation/components/validate';
import { UNDERSCORE } from '../../../constants/utils';
import Endpoints from '../../../redux/actions/endpoints';
import Snackbar from '@material-ui/core/Snackbar';

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
    fetch(Endpoints.sendAnnouncement, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ title, body: message })
    }).then(res => this._displayToast(res.status));
  };

  _displayToast(httpStatus) {
    if (UNDERSCORE.isEqual(httpStatus, 200)) {
      this.setState({
        displayToast: true,
        displayMessage: 'Message sent successfully'
      });
    } else {
      this.setState({
        displayToast: true,
        displayMessage: 'Error sending message!'
      });
    }
  }

  _validateInputs = () => {};

  render() {
    const { pristine, reset, submitting, handleSubmit } = this.props;
    return (
      <div>
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
        {this.state.displayToast && (
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={3000}
            open={this.state.displayToast}
            ContentProps={{
              'aria-describedby': 'message-id'
            }}
            onClose={() => this.setState({ displayToast: false })}
            message={<span id="message-id">{this.state.displayMessage}</span>}
          />
        )}
      </div>
    );
  }
}

export default reduxForm({ form: 'announcement_form' })(
  withTranslation('common')(AnnouncementForm)
);
