import React from 'react';
import { Card, CardBody, Col, Button, ButtonToolbar, Row } from 'reactstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { withTranslation } from 'react-i18next';
import Endpoints from '../../../../redux/actions/endpoints';
import PropTypes from 'prop-types';

const _validateForm = values => {
  const errors = {};
  return errors;
};

class LinkFrontdeskUserForm extends React.PureComponent {
  _handleSubmit = ({}) => {};

  render() {
    const { pristine, reset, submitting, handleSubmit } = this.props;
    return (
      <Col md={6}>
        <Card>
          <CardBody>
            <div className='card__title'>
              <h5 className='bold-text'>Link Front-Desk User</h5>
            </div>
            <form
              className='form form--horizontal'
              onSubmit={handleSubmit(this._handleSubmit)}
            >
              <ButtonToolbar className='form__button-toolbar'>
                <Button
                  color='primary'
                  type='submit'
                  disabled={pristine || submitting}
                >
                  Link
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
  form: 'link_frontdeskuser_form',
  validate: _validateForm
})(withTranslation('common')(LinkFrontdeskUserForm));
