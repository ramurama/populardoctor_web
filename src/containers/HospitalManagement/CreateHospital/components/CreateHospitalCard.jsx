import React, { PureComponent } from "react";
import {
  Card,
  CardBody,
  Col,
  Button,
  ButtonToolbar,
  Container
} from "reactstrap";
import { Field, reduxForm, SubmissionError } from "redux-form";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import Snackbar from "@material-ui/core/Snackbar";
import SaveIcon from 'mdi-react/ContentSaveIcon'
import { save, update } from "../../../../redux/actions/hospitalActions";
import validate from "../../../../components/Form/FormValidation/components/validate";
import { addHospital } from "../constants/hospitalForm";
import { UNDERSCORE } from "../../../../constants/utils";
import * as Action from "../../../../redux/actions/hospitalActions";

const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error }
}) => (
  <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
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
  placeholder: "",
  meta: null,
  type: "text"
};

class CreateHospitalCard extends PureComponent {
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
      saveData: {
        name: "",
        address: "",
        location: "",
        pincode: "",
        landmark: ""
      },
      hospitalId: "",
      displayToast: false,
      toastMessage: "",
      errorText: {}
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const pathName = location.pathname;
    if (pathName.includes("edit")) {
      const pdNumber = pathName.split("/")[pathName.split("/").length - 1];
      this.props.getHospitalDetail(pdNumber);
    } else {
      this.props.clearHospitalDetail();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { location, initialValues } = prevProps;
    const pathName = location.pathname;
    if (!pathName.includes("edit") && !UNDERSCORE.isEmpty(initialValues)) {
      this.props.clearHospitalDetail();
    }
  }
  _handleChange = (key, event) => {
    const { saveData } = this.state;
    saveData[key] = event.target.value;
    this.setState({ saveData });
  };

  _handleSubmit = ({
    name = "",
    streetName = "",
    building = "",
    location = "",
    landmark = "",
    pincode = 0,
    latitude = 0,
    longitude = 0
  }) => {
    const saveData = {
      name,
      streetName,
      building,
      location,
      landmark,
      pincode,
      latitude,
      longitude
    };
    const errorText = {};
    Object.keys(saveData).forEach(key =>
      this.validateTextData(saveData[key], key, saveData, errorText)
    );
    this._validatePincode(saveData.pincode, errorText);
    const error = Object.keys(errorText).filter(key => !!errorText[key]).length;
    if (error !== 0) {
      throw new SubmissionError(errorText);
    }
    const data = {
      name: saveData.name,
      address: JSON.stringify({
        streetName: saveData.streetName,
        building: saveData.building
      }),
      location: saveData.location,
      landmark: saveData.landmark,
      pincode: saveData.pincode,
      latLng: [latitude, longitude]
    };
    if (this.props.isUpdate) {
      const id = this.props.initialValues._id;
      const pdNumber = this.props.initialValues.hospitalPdNumber;
      update(data, id)
        .then(res => res.json())
        .then(res => {
          this.setState(
            { displayToast: true, toastMessage: res.message },
            () => {
              if (res.status) {
                this.props.getHospitalDetail(pdNumber);
              }
            }
          );
        });
    } else {
      save(data)
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
    }
  };

  validateTextData = (value, key, editValue, errorText) => {
    const type = addHospital[key] ? addHospital[key].type : "other";
    if (type !== "other") {
      if (UNDERSCORE.isEmpty(value)) {
        editValue[key] = value;
        errorText[key] = addHospital[key].emptyField;
        return;
      }
      if (value.length <= addHospital[key].length) {
        errorText[key] = null;
        editValue[key] = value;
      }
    }
  };
  _validatePincode = (value, errorText) => {
    if (
      value &&
      value.length !== 0 &&
      value.length !== addHospital["pincode"].length
    ) {
      errorText["pincode"] = addHospital["pincode"].errorText;
    }
  };
  _handleClose = () => {
    this.setState({ displayToast: false });
  };

  render() {
    const { reset, handleSubmit } = this.props;

    return (
      <Container>
        <Card>
          <CardBody>
            <form
              className="form form--horizontal"
              onSubmit={handleSubmit(this._handleSubmit)}
            >
              <Col>
                <div className="form__form-group">
                  <span className="form__form-group-label">Hospital Name</span>
                  <div className="form__form-group-field">
                    <Field
                      name="name"
                      component={renderField}
                      type="text"
                      placeholder="Hospital Name"
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">Street name</span>
                  <div className="form__form-group-field">
                    <Field
                      name="streetName"
                      component={renderField}
                      type="text"
                      placeholder="Street name"
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">Building</span>
                  <div className="form__form-group-field">
                    <Field
                      name="building"
                      component={renderField}
                      type="text"
                      placeholder="Building"
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">Location</span>
                  <div className="form__form-group-field">
                    <Field
                      name="location"
                      component={renderField}
                      type="text"
                      placeholder="Location"
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">Latitude</span>
                  <div className="form__form-group-field">
                    <Field
                      name="latitude"
                      component={renderField}
                      type="number"
                      placeholder="latitude"
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">Longitude</span>
                  <div className="form__form-group-field">
                    <Field
                      name="longitude"
                      component={renderField}
                      type="number"
                      placeholder="Longitude"
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">Pincode</span>
                  <div className="form__form-group-field">
                    <Field
                      name="pincode"
                      component={renderField}
                      type="number"
                      placeholder="Pincode"
                      onChange={value => this._handleChange("pincode", value)}
                    />
                  </div>
                </div>
                <div className="form__form-group">
                  <span className="form__form-group-label">Landmark</span>
                  <div className="form__form-group-field">
                    <Field
                      name="landmark"
                      component={renderField}
                      type="text"
                      placeholder="Landmark"
                    />
                  </div>
                </div>
              </Col>
              <Col >
                <ButtonToolbar className="form__button-toolbar">
                  <Button className="icon" size="sm" color="primary" type="submit">
									<SaveIcon/>
                    Save
                  </Button>
                  <Button type="button" size="sm" onClick={reset}>
                    Cancel
                  </Button>
                </ButtonToolbar>
              </Col>
            </form>
          </CardBody>
        </Card>
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
      </Container>
    );
  }
}
function mapStateToProps(state) {
  const hospitalState = state.hospital;
  let isUpdate = false;
  const defaultData =
    !UNDERSCORE.isEmpty(hospitalState) &&
    !UNDERSCORE.isEmpty(hospitalState.hospitalDetail)
      ? hospitalState.hospitalDetail
      : {};
  if (!UNDERSCORE.isEmpty(defaultData)) {
    isUpdate = true;
    const address = JSON.parse(defaultData.address);
    defaultData.latitude = defaultData.latLng[0];
    defaultData.longitude = defaultData.latLng[1];
    defaultData.streetName = address.streetName;
    defaultData.building = address.building;
  }
  return {
    initialValues: { ...defaultData },
    isUpdate
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getHospitalDetail: pdNumber => {
      dispatch(Action.getHospitalDetail(pdNumber));
    },
    clearHospitalDetail: () => {
      dispatch(Action.clearHospitalDetail());
    }
  };
}
CreateHospitalCard = reduxForm({
  form: "hospital", // a unique identifier for this form
  enableReinitialize: true,
  validate
})(withTranslation("common")(CreateHospitalCard));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateHospitalCard));
