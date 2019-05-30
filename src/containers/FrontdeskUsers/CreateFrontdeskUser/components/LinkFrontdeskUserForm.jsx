import React from 'react';
import { Card, CardBody, Col, Button, ButtonToolbar, Row } from 'reactstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { withTranslation } from 'react-i18next';
import renderSelectField from '../../../../components/shared/components/form/Select';
import Endpoints from '../../../../redux/actions/endpoints';
import _ from 'underscore';

const MODE = {
  VIEW: 1,
  PREEDIT: 2,
  EDIT: 3
};

const _validateForm = values => {
  const errors = {};
  if (!values.doctorId) {
    errors.doctorId = 'Select a doctor';
  }
  if (!values.hospitalId) {
    errors.hospitalId = 'Select a hospital';
  }
  if (!values.frontdeskUserId) {
    errors.frontdeskUserId = 'Select a front-desk user';
  }
  return errors;
};

const doctorsListPromise = new Promise((resolve, reject) => {
  fetch(Endpoints.getDoctorMasterList)
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err));
});

const hospitalListPromise = new Promise((resolve, reject) => {
  fetch(Endpoints.getHospitalMasterList)
    .then(res => res.json())
    .then(res => resolve(res))
    .catch(err => reject(err));
});

class LinkFrontdeskUserForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      doctorsList: [],
      hospitalsList: [],
      frontdeskUsersList: [],
      mode: MODE.VIEW,
      showFrontdeskUserField: false
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    Promise.all([doctorsListPromise, hospitalListPromise])
      .then(data => {
        const doctorsList = data[0].map(doctor => {
          const { pdNumber, doctorId, name } = doctor;
          return { label: `${name}(${pdNumber})`, value: doctorId };
        });
        const hospitalsList = data[1].map(hospital => {
          const { pdNumber, name, hospitalId } = hospital;
          return { label: ` ${name}(${pdNumber})`, value: hospitalId };
        });
        this.setState({ doctorsList, hospitalsList });
      })
      .catch(err => console.error(err));
  }

  _handleViewSubmit = ({ doctor, hospital }) => {
    const doctorId = doctor.value;
    const hospitalId = hospital.value;
    fetch(Endpoints.getDoctorFrontdeskUser + `/${doctorId}/${hospitalId}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (!_.isNull(res) && !_.isEmpty(res)) {
          //set mode to pre edit
          const frontdeskUser = `${res.fullName}(${res.mobile})`;
          // const frontdeskUser = res.userId  ;
          this.setState(
            { showFrontdeskUserField: true, mode: MODE.PREEDIT },
            () =>
              this.props.initialize({
                doctor,
                hospital,
                frontdeskUser
              })
          );
        } else {
          //no frontdeskuser available for the selected combination
          //set mode to edit
          this.setState({ showFrontdeskUserField: true, mode: MODE.EDIT }, () =>
            this.props.initialize({
              doctor,
              hospital
            })
          );
        }
      })
      .catch(err => console.error(err));
  };

  _handlePreEditSubmit = ({ doctor, hospital, frontdeskUser }) => {
    this.setState({ mode: MODE.EDIT }, () => {
      this.props.initialize({ doctor, hospital, frontdeskUser });
    });
  };

  _handleEditSubmit = ({ doctor, hospital, frontdeskUser }) => {
    const doctorId = doctor.value;
    const hospitalId = hospital.value;
    const frontdeskUserId = frontdeskUser.value;
    fetch(Endpoints.linkFrontdeskUser, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ doctorId, hospitalId, frontdeskUserId })
    })
      .then(res => res.json())
      .then(res => {
        if (res.status) {
          this._resetForm();
        }
        this.props.onResponse(res);
      })
      .catch(err => console.error(err));
  };

  _resetForm() {
    this.setState({ mode: MODE.VIEW, showFrontdeskUserField: false }, () =>
      this.props.initialize({ doctor: '', hospital: '' })
    );
  }

  render() {
    const { mode } = this.state;
    const { pristine, reset, submitting, handleSubmit } = this.props;
    let _handleSubmit = undefined;
    if (_.isEqual(mode, MODE.VIEW)) {
      _handleSubmit = this._handleViewSubmit;
    } else if (_.isEqual(mode, MODE.PREEDIT)) {
      _handleSubmit = this._handlePreEditSubmit;
    } else if (_.isEqual(mode, MODE.EDIT)) {
      _handleSubmit = this._handleEditSubmit;
    }
    return (
      <Col md={6}>
        <Card>
          <CardBody>
            <div className='card__title'>
              <h5 className='bold-text'>Link Front-Desk User</h5>
            </div>
            <form
              className='form form--horizontal'
              onSubmit={handleSubmit(_handleSubmit)}
            >
              <div className='form__form-group'>
                <span className='form__form-group-label'>Doctor</span>
                <div className='form__form-group-field'>
                  <Field
                    name='doctor'
                    component={renderSelectField}
                    options={this.state.doctorsList}
                  />
                </div>
              </div>
              <div className='form__form-group'>
                <span className='form__form-group-label'>Hospital</span>
                <div className='form__form-group-field'>
                  <Field
                    name='hospital'
                    component={renderSelectField}
                    options={this.state.hospitalsList}
                  />
                </div>
              </div>
              {this.state.showFrontdeskUserField && (
                <div className='form__form-group'>
                  <span className='form__form-group-label'>
                    Front-desk User
                  </span>
                  <div className='form__form-group-field'>
                    {_.isEqual(mode, MODE.EDIT) && (
                      <Field
                        name='frontdeskUser'
                        component={renderSelectField}
                        options={this.props.frontdeskUsersList}
                      />
                    )}
                    {_.isEqual(mode, MODE.VIEW) ||
                      (_.isEqual(mode, MODE.PREEDIT) && (
                        <Field
                          name='frontdeskUser'
                          component='input'
                          type='text'
                          disabled={true}
                        />
                      ))}
                  </div>
                </div>
              )}

              <ButtonToolbar className='form__button-toolbar'>
                <Button
                  color='primary'
                  type='submit'
                  disabled={
                    (!_.isEqual(mode, MODE.PREEDIT) && pristine) || submitting
                  }
                >
                  {_.isEqual(mode, MODE.VIEW) && 'Check'}
                  {_.isEqual(mode, MODE.PREEDIT) && 'Edit'}
                  {_.isEqual(mode, MODE.EDIT) && 'Link'}
                </Button>
                <Button
                  type='button'
                  onClick={() => this._resetForm()}
                  disabled={
                    (!_.isEqual(mode, MODE.PREEDIT) &&
                      (!_.isEqual(mode, MODE.EDIT) && pristine)) ||
                    submitting
                  }
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
