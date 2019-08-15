import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { ButtonToolbar, Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import Endpoints from '../../../redux/actions/endpoints';
import Snackbar from '@material-ui/core/Snackbar';

class CustomerCareForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      contactNumber: '',
      contactEmail: '',
      displayToast: false,
      displayMessage: ''
    };
  }

  componentDidMount() {
    this._fetchSupportDetails();
  }

  _fetchSupportDetails() {
    fetch(Endpoints.getSupportDetails)
      .then(res => res.json())
      .then(res => {
        const { contactNumber, contactEmail } = res;
        this.setState({ contactNumber, contactEmail }, () =>
          this.props.initialize({
            contactNumber,
            contactEmail
          })
        );
      });
  }

  _handleSubmit = ({ contactNumber, contactEmail }) => {
    this._updateSupportDetails(contactNumber, contactEmail);
  };

  _handleEdit = () => this.setState({ isEditMode: true });

  _updateSupportDetails(contactNumber, contactEmail) {
    fetch(Endpoints.setSupportDetails, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify({ contactNumber, contactEmail })
    }).then(res => {
      if (res.status) {
        this.setState({
          displayToast: true,
          displayMessage: 'Customer Care details updated successfully',
          isEditMode: false
        });
      } else {
        this.setState({
          displayToast: false,
          displayMessage: 'Customer Care details updation failure.'
        });
      }
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const { isEditMode } = this.state;
    return (
      <Col md={6}>
        <Card>
          <CardBody>
            <div className='card__title'>
              <h5 className='bold-text'>Contact Details</h5>
            </div>
            <form
              className='form form--horizontal'
              onSubmit={
                this.state.isEditMode
                  ? handleSubmit(this._handleSubmit)
                  : handleSubmit(this._handleEdit)
              }
            >
              <div className='form__form-group'>
                <span className='form__form-group-label'>Contact Number</span>
                <div className='form__form-group-field'>
                  <Field
                    name='contactNumber'
                    component='input'
                    type='text'
                    placeholder='Contact Number'
                    disabled={!isEditMode}
                    minLength={10}
                    maxLength={10}
                  />
                </div>
              </div>
              <div className='form__form-group'>
                <span className='form__form-group-label'>Contact Email</span>
                <div className='form__form-group-field'>
                  <Field
                    name='contactEmail'
                    component='input'
                    type='email'
                    placeholder='Contact Email'
                    disabled={!isEditMode}
                  />
                </div>
              </div>
              <ButtonToolbar className='form__button-toolbar'>
                <Button color='primary'>
                  {this.state.isEditMode ? 'Save' : 'Edit'}
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

export default reduxForm({ form: 'customercare_form' })(
  withTranslation('common')(CustomerCareForm)
);
