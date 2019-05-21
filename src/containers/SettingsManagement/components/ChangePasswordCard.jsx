import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { ButtonToolbar, Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import { CHANGE_PASSWORD } from '../../../constants/strings';
import Snackbar from '@material-ui/core/Snackbar';
import Endpoints from '../../../redux/actions/endpoints';
import EyeIcon from 'mdi-react/EyeIcon';

class ChangePassword extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayToast: false,
      displayMessage: '',
      showPassword: false
    };
  }

  _handleSubmit = ({ currentPassword, newPassword }) => {
    fetch(Endpoints.changePassword, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword })
    })
      .then(res => res.json())
      .then(res =>
        this.setState(
          { displayToast: true, displayMessage: res.message },
          () => {
            if (res.status) {
              this.props.reset();
            }
          }
        )
      )
      .catch(err => console.log(err));
  };

  showPassword = e => {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  render() {
    const { pristine, reset, submitting, handleSubmit } = this.props;
    const { showPassword } = this.state;
    return (
      <Col md={6}>
        <Card>
          <CardBody>
            <div className='card__title'>
              <h5 className='bold-text'>{CHANGE_PASSWORD}</h5>
            </div>
            <form
              className='form form--horizontal'
              onSubmit={handleSubmit(this._handleSubmit)}
            >
              <div className='form__form-group'>
                <span className='form__form-group-label'>Current Password</span>
                <div className='form__form-group-field'>
                  <Field
                    name='currentPassword'
                    component='input'
                    type='password'
                    placeholder='Current Password'
                    minLength={6}
                  />
                </div>
              </div>
              <div className='form__form-group'>
                <span className='form__form-group-label'>New Passoword</span>
                <div className='form__form-group-field'>
                  <Field
                    name='newPassword'
                    component='input'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='New password'
                    minLength={6}
                  />
                  <button
                    className={`form__form-group-button${
                      showPassword ? ' active' : ''
                    }`}
                    onClick={e => this.showPassword(e)}
                    type='button'
                  >
                    <EyeIcon />
                  </button>
                </div>
              </div>
              <ButtonToolbar className='form__button-toolbar'>
                <Button color='primary' type='submit'>
                  Save
                </Button>
                <Button
                  type='button'
                  onClick={reset}
                  disabled={pristine || submitting}
                >
                  Clear
                </Button>
              </ButtonToolbar>
              {this.state.displayToast && (
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  autoHideDuration={3000}
                  open={this.state.displayToast}
                  ContentProps={{
                    'aria-describedby': 'message-id'
                  }}
                  onClose={() => this.setState({ displayToast: false })}
                  message={
                    <span id='message-id'>{this.state.displayMessage}</span>
                  }
                />
              )}
            </form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default reduxForm({ form: 'change_password_form' })(
  withTranslation('common')(ChangePassword)
);
