import React, { PureComponent } from 'react';
import { Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Endpoints from '../../../redux/actions/endpoints';

class LogInForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      showPassword: false
    };
  }

  showPassword = e => {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  _handleSubmit = ({ username, password }) => {
    fetch(Endpoints.login, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      });
  };

  render() {
    const { handleSubmit } = this.props;
    const { showPassword } = this.state;

    return (
      <form className='form' onSubmit={handleSubmit(this._handleSubmit)}>
        <div className='form__form-group'>
          <span className='form__form-group-label'>Username</span>
          <div className='form__form-group-field'>
            <div className='form__form-group-icon'>
              <AccountOutlineIcon />
            </div>
            <Field
              name='username'
              component='input'
              type='text'
              placeholder='Name'
            />
          </div>
        </div>
        <div className='form__form-group'>
          <span className='form__form-group-label'>Password</span>
          <div className='form__form-group-field'>
            <div className='form__form-group-icon'>
              <KeyVariantIcon />
            </div>
            <Field
              name='password'
              component='input'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
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
          <div className='account__forgot-password'>
            <a href='/'>Forgot a password?</a>
          </div>
        </div>
        <div className='form__form-group'>
          {/* <div className="form__form-group-field">
            <Field
              name="remember_me"
              component={renderCheckBoxField}
              label="Remember me"
            />
          </div> */}
        </div>
        <Button
          type='submit'
          className='btn btn-primary account__btn account__btn--small'
        >
          Sign In
        </Button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'log_in_form'
})(LogInForm);
