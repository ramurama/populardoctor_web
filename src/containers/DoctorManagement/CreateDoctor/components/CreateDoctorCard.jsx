import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Col, Button, ButtonToolbar, Row } from 'reactstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Snackbar from '@material-ui/core/Snackbar';
import * as Action from '../../../../redux/actions/doctorActions';
import validate from '../../../../components/Form/FormValidation/components/validate';
import { addDoctor, emptyField } from '../constants/doctorForm';
import { UNDERSCORE } from '../../../../constants/utils';
import renderSelectField from '../../../../components/shared/components/form/Select';
import renderDatePicker from '../../../../components/shared/components/form/DatePicker';
import renderDropZoneField from '../../../../components/shared/components/form/DropZone';
const moment = require('moment');

const profileImage =
  'https://images.pexels.com/photos/433635/pexels-photo-433635.jpeg?auto=compress%5Cu0026cs=tinysrgb%5Cu0026dpr=2%5Cu0026h=750%5Cu0026w=1260';

const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error }
}) => (
  <div className="form__form-group-input-wrap ">
    <input {...input} placeholder={placeholder} type={type} />
    {touched && error && (
      <span className="form__form-group-error">{error}</span>
    )}
  </div>
);

renderField.propTypes = {
  input: PropTypes.shape().isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string
  })
};

renderField.defaultProps = {
  placeholder: '',
  meta: null,
  type: 'text'
};

class CreateDoctorCard extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  constructor() {
    super();
    this.state = {
      showPassword: false,
      displayToast: false,
      toastMessage: '',
      errorText: {}
    };
  }

  componentDidMount() {
    this.props.getSpecialization();
  }
  _handleChange = (key, event) => {
    const { saveData } = this.state;
    saveData[key] = event.target.value;
    this.setState({ saveData });
  };

  _handleSubmit = ({
    fullName = '',
    mobile = '',
    yearsOfExperience = '',
    degree = '',
    dateOfBirth = '',
    specialization = '',
    gender = '',
    profileContent = ''
  }) => {
    const editValue = {
      fullName,
      mobile,
      yearsOfExperience,
      degree,
      dateOfBirth: dateOfBirth ? moment(dateOfBirth).format('DD-MM-YYYY"') : '',
      specialization: specialization.label,
      gender: gender.label,
      profileContent
    };
    const errorText = {};
    editValue.password = editValue.mobile;
    editValue.profileImage = profileImage;
    Object.keys(editValue).forEach(key =>
      this.validateTextData(editValue[key], key, editValue, errorText)
    );
    this.validateOtherFields(editValue, errorText);
    this._mobileNumberValidate(editValue.mobile, errorText);
    this.setState({ errorText });
    const error = Object.keys(errorText).filter(key => !!errorText[key]).length;
    if (error === 0) {
      this.setState({ active: true });
      Action.save(editValue)
        .then(res => res.json())
        .then(res => {
          this.setState(
            { displayToast: true, toastMessage: res.message },
            () => {
              if (res.status) {
                this.props.reset();
              }
            }
          );
        });
    } else {
      throw new SubmissionError(errorText);
    }
  };

  validateTextData = (value, key, editValue, errorText) => {
    const type = addDoctor[key] ? addDoctor[key].type : 'other';
    if (type !== 'other') {
      if (UNDERSCORE.isEmpty(value)) {
        editValue[key] = value;
        errorText[key] = addDoctor[key].emptyField;
        return;
      }
      if (value.length <= addDoctor[key].length) {
        errorText[key] = null;
        editValue[key] = value;
      }
    }
  };

  validateOtherFields = (editValue, errorText) => {
    if (!editValue['dateOfBirth']) {
      errorText['dateOfBirth'] = emptyField;
    }
    if (UNDERSCORE.isEmpty(editValue['gender'])) {
      errorText['gender'] = emptyField;
    }
    if (UNDERSCORE.isEmpty(editValue['specialization'])) {
      errorText['specialization'] = emptyField;
    }
  };

  _mobileNumberValidate = (value, errorText) => {
    if (value && value.length !== 0 && value.length !== 10) {
      errorText['mobile'] = addDoctor['mobile'].errorText;
    }
  };

  _parseList = dataList => {
    return dataList
      ? dataList.map(data => ({
          value: data.name,
          label: data.name
        }))
      : [];
  };

  _handleClose = () => {
    this.setState({ displayToast: false });
  };

  render() {
    const { pristine, reset, submitting, handleSubmit } = this.props;
    const specializations = this._parseList(this.props.specializations);
    return (
      <Card>
        <CardBody>
          <Row>
            <Col md={6} sm={12}>
              <form
                className="form form--horizontal"
                onSubmit={handleSubmit(this._handleSubmit)}
              >
                <div className="form__form-group">
                  <span className="form__form-group-label">Full Name</span>
                  <div className="form__form-group-field">
                    <Field
                      name="fullName"
                      component={renderField}
                      type="text"
                      placeholder="Full Name"
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">Mobile</span>
                  <div className="form__form-group-field">
                    <Field
                      name="mobile"
                      component={renderField}
                      type="number"
                      placeholder="Mobile"
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">Date of Birth</span>
                  <div className="form__form-group-field">
                    <Field
                      name="dateOfBirth"
                      component={renderDatePicker}
                      placeholder="Date of Birth"
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">Gender</span>
                  <div className="form__form-group-field">
                    <Field
                      name="gender"
                      component={renderSelectField}
                      type="text"
                      placeholder="Gender"
                      width={150}
                      options={[
                        { value: 'male', label: 'MALE' },
                        { value: 'female', label: 'FEMALE' }
                      ]}
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">Specialization</span>
                  <div className="form__form-group-field">
                    <Field
                      name="specialization"
                      component={renderSelectField}
                      type="text"
                      placeholder="Specialization"
                      width={200}
                      options={specializations}
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">Degree</span>
                  <div className="form__form-group-field">
                    <Field
                      name="degree"
                      component={renderField}
                      type="text"
                      placeholder="Degree"
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    Years Of Experience
                  </span>
                  <div className="form__form-group-field">
                    <Field
                      name="yearsOfExperience"
                      component={renderField}
                      type="number"
                      placeholder="Years Of Experience"
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">Description</span>
                  <div className="form__form-group-field">
                    <Field
                      name="profileContent"
                      component="textarea"
                      placeholder="Description"
                    />
                  </div>
                </div>
                <div style={{ float: 'right' }}>
                  <ButtonToolbar className="form__button-toolbar">
                    <Button
                      color="primary"
                      type="submit"
                      disabled={pristine || submitting}
                    >
                      Save
                    </Button>
                    <Button
                      type="button"
                      onClick={reset}
                      disabled={pristine || submitting}
                    >
                      Cancel
                    </Button>
                  </ButtonToolbar>
                </div>
              </form>
            </Col>
            <Col md={6} sm={12}>
              <Card style={{ height: 150 }}>
                <CardBody>
                  <div className="card__title">
                    <h5 className="subhead">For files upload</h5>
                  </div>
                  <form className="form" onSubmit={handleSubmit}>
                    <Field name="files" component={renderDropZoneField} />
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </CardBody>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={3000}
          open={this.state.displayToast}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          onClose={this._handleClose}
          message={<span id="message-id">{this.state.toastMessage}</span>}
        />
      </Card>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getSpecialization: () => {
      dispatch(Action.getSpecialization());
    }
  };
}
function mapStateToProps(state) {
  const doctorState = state.doctor;
  return {
    specializations: !UNDERSCORE.isEmpty(doctorState)
      ? doctorState.specialization
      : []
  };
}
CreateDoctorCard.contextTypes = {
  router: PropTypes.object
};

CreateDoctorCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateDoctorCard);

export default reduxForm({
  form: 'doctor', // a unique identifier for this form
  validate
})(withTranslation('common')(CreateDoctorCard));
