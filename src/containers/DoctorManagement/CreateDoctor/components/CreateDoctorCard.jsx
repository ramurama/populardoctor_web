import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  Col,
  Button,
  ButtonToolbar,
  Row,
  Container
} from "reactstrap";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import Snackbar from "@material-ui/core/Snackbar";
import * as Action from "../../../../redux/actions/doctorActions";
import { CREATE_DOCTOR, EDIT_DOCTOR } from "../../../../constants/strings";
import validate from "../../../../components/Form/FormValidation/components/validate";
import { addDoctor, emptyField } from "../constants/doctorForm";
import { UNDERSCORE } from "../../../../constants/utils";
import renderSelectField from "../../../../components/shared/components/form/Select";
import renderDatePicker from "../../../../components/shared/components/form/DatePicker";
import ProfileImageUploadForm from "./ProfileImageUploadForm";
import Endpoints from "../../../../redux/actions/endpoints";

const moment = require("moment");

const renderField = ({
  input,
  placeholder,
  type,
  disabled,
  meta: { touched, error }
}) => (
  <div className="form__form-group-input-wrap ">
    <input
      {...input}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
    />
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
  placeholder: "",
  meta: null,
  type: "text"
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
      dateOfBirth: "",
      toastMessage: "",
      errorText: {},
      doProfileImageUpload: false,
      doctorPdNumber: null,
      disableButtonActions: false,
      showProfileImageUploader: false
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const pathName = location.pathname;
    if (pathName.includes("edit")) {
      const pdNumber = pathName.split("/")[pathName.split("/").length - 1];
      this.props.getDoctorDetail(pdNumber);
    } else {
      this.props.clearDoctorDetail();
    }
    this.props.getSpecialization();
    if (UNDERSCORE.isEmpty(this.props.initialValues.profileImage)) {
      this.setState({ showProfileImageUploader: true });
    }
  }
  _handleChange = (key, event) => {
    const { saveData } = this.state;
    saveData[key] = event.target.value;
    this.setState({ saveData });
  };

  _handleSubmit = ({
    fullName = "",
    mobile = "",
    yearsOfExperience = 0,
    degree = "",
    dateOfBirth = "",
    specialization = "",
    gender = "",
    profileContent = ""
  }) => {
    const editValue = {
      fullName,
      mobile,
      yearsOfExperience,
      degree,
      dateOfBirth: !UNDERSCORE.isEmpty(dateOfBirth) ? dateOfBirth : "",
      specialization: specialization.label,
      gender: gender.label,
      profileContent
    };
    const errorText = {};
    editValue.password = editValue.mobile;
    editValue.profileImage = this.props.initialValues.profileImage;
    Object.keys(editValue).forEach(key =>
      this.validateTextData(editValue[key], key, editValue, errorText)
    );
    this.validateOtherFields(editValue, errorText);
    this._mobileNumberValidate(editValue.mobile, errorText);
    this.setState({ errorText });
    const error = Object.keys(errorText).filter(key => !!errorText[key]).length;
    if (error === 0) {
      this.setState({ active: true });
      if (this.props.isUpdate) {
        const id = this.props.initialValues.doctorId;
        const pdNumber = this.props.initialValues.doctorPdNumber;
        Action.update(editValue, id)
          .then(res => res.json())
          .then(res => {
            if (res.status) {
              this.setState({
                toastMessage: res.message
                // displayToast: true
                // disableButtonActions: true
              });
              this.props.getDoctorDetail(pdNumber);
            } else {
              //else display a toast with the returned message
              this.setState({
                displayToast: true,
                toastMessage: res.message
              });
            }
          });
      } else {
        Action.save(editValue)
          .then(res => res.json())
          .then(res => {
            if (res.status) {
              //if data saved successfully, upload the profile image with the returned doctorPdNumber
              this.setState(
                { toastMessage: res.message, disableButtonActions: true },
                () => this.profileImageUploader.upload(res.doctorPdNumber)
              );
            } else {
              //else display a toast with the returned message
              this.setState({
                displayToast: true,
                toastMessage: res.message
              });
            }
          });
      }
    } else {
      throw new SubmissionError(errorText);
    }
  };

  validateTextData = (value, key, editValue, errorText) => {
    const type = addDoctor[key] ? addDoctor[key].type : "other";
    switch (type) {
      case "number":
        if (UNDERSCORE.isEmpty(value.toString())) {
          editValue[key] = value;
          errorText[key] = addDoctor[key].emptyField;
          return;
        }
        errorText[key] = null;
        editValue[key] = value;
        break;
      case "text":
        if (UNDERSCORE.isEmpty(value)) {
          editValue[key] = value;
          errorText[key] = addDoctor[key].emptyField;
          return;
        }
        if (value.length <= addDoctor[key].length) {
          errorText[key] = null;
          editValue[key] = value;
        }
        break;
      default:
        break;
    }
  };

  validateOtherFields = (editValue, errorText) => {
    if (!editValue["dateOfBirth"] && UNDERSCORE.isEmpty(editValue["dateOfBirth"])) {
      errorText["dateOfBirth"] = emptyField;
    }
    if (UNDERSCORE.isEmpty(editValue["gender"])) {
      errorText["gender"] = emptyField;
    }
    if (UNDERSCORE.isEmpty(editValue["specialization"])) {
      errorText["specialization"] = emptyField;
    }
  };

  _mobileNumberValidate = (value, errorText) => {
    if (value && value.length !== 0 && value.length !== 10) {
      errorText["mobile"] = addDoctor["mobile"].errorText;
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

  handleDOBChange = date => {
    this.setState({ dateOfBirth: date });
  };
  _handleClose = () => {
    this.setState({ displayToast: false });
  };

  render() {
    const { pristine, reset, submitting, handleSubmit, isUpdate } = this.props;
    const specializations = this._parseList(this.props.specializations);
    const title = isUpdate ? EDIT_DOCTOR : CREATE_DOCTOR;
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="page-title">{title}</h3>
          </Col>
        </Row>
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
                        disabled={this.props.isUpdate}
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">
                      Date of Birth
                    </span>
                    <div className="form__form-group-field">
                      <Field
                        name="dateOfBirth"
                        component={renderDatePicker}
                        placeholder="Date of Birth"
                        onChange={this.handleDOBChange}
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
                          { value: "male", label: "MALE" },
                          { value: "female", label: "FEMALE" }
                        ]}
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">
                      Specialization
                    </span>
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
                  <div style={{ float: "right" }}>
                    <ButtonToolbar className="form__button-toolbar">
                      <Button
                        color="primary"
                        type="submit"
                        disabled={
                          pristine ||
                          submitting ||
                          this.state.disableButtonActions
                        }
                      >
                        Save
                      </Button>
                      <Button
                        type="button"
                        onClick={reset}
                        disabled={
                          pristine ||
                          submitting ||
                          this.state.disableButtonActions
                        }
                      >
                        Cancel
                      </Button>
                    </ButtonToolbar>
                  </div>
                </form>
              </Col>
              <Col md={6} sm={12}>
                <Row
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    paddingLeft: "5%"
                  }}
                >
                  {!UNDERSCORE.isEmpty(this.props.initialValues.profileImage) &&
                    !this.state.showProfileImageUploader && (
                      <div>
                        <Row>
                          <img
                            src={this.props.initialValues.profileImage}
                            style={{
                              height: "40%",
                              width: "40%",
                              resizeMode: "contain"
                            }}
                          />
                        </Row>
                        <Row>
                          <Button
                            onClick={() => {
                              fetch(
                                Endpoints.deleteProfileImage +
                                  this.props.initialValues.doctorPdNumber,
                                {
                                  method: "DELETE"
                                }
                              )
                                .then(res => res.json())
                                .then(res => {
                                  alert(res);
                                });
                            }}
                            color="danger"
                            type="button"
                            // disabled={pristine || submitting}
                            style={{ marginTop: "2%" }}
                          >
                            Delete
                          </Button>
                        </Row>
                      </div>
                    )}
                </Row>
                {this.state.showProfileImageUploader && (
                  <div>
                    <Row>
                      <Button
                        onClick={() =>
                          this.profileImageUploader.upload(
                            this.props.initialValues.doctorPdNumber
                          )
                        }
                        color="primary"
                        type="button"
                        // disabled={pristine || submitting}
                      >
                        Change
                      </Button>
                    </Row>
                    <Row>
                      <ProfileImageUploadForm
                        onRef={ref => (this.profileImageUploader = ref)}
                        onUploadComplete={status =>
                          this.setState(
                            {
                              displayToast: true,
                              toastMessage:
                                "Profile image updated successfully.",
                              disableButtonActions: false
                            },
                            () => this.props.reset()
                          )
                        }
                      />
                    </Row>
                  </div>
                )}
              </Col>
            </Row>
          </CardBody>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={3000}
            open={this.state.displayToast}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            onClose={this._handleClose}
            message={<span id="message-id">{this.state.toastMessage}</span>}
          />
        </Card>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getSpecialization: () => {
      dispatch(Action.getSpecialization());
    },
    getDoctorDetail: pdNumber => {
      dispatch(Action.getDoctorDetail(pdNumber));
    },
    clearDoctorDetail: () => {
      dispatch(Action.clearDoctorDetail());
    }
  };
}
function mapStateToProps(state) {
  const doctorState = state.doctor;
  const defaultData =
    !UNDERSCORE.isEmpty(doctorState) &&
    !UNDERSCORE.isEmpty(doctorState.doctorDetail)
      ? doctorState.doctorDetail
      : {};
  return {
    specializations: !UNDERSCORE.isEmpty(doctorState)
      ? doctorState.specialization
      : [],
    initialValues: {
      ...defaultData
    },
    isUpdate: !UNDERSCORE.isEmpty(defaultData)
  };
}
CreateDoctorCard.contextTypes = {
  router: PropTypes.object
};

CreateDoctorCard = reduxForm({
  form: "doctor",
  enableReinitialize: true,
  destroyOnUnmount: true,
  validate
})(withTranslation("common")(CreateDoctorCard));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateDoctorCard));
