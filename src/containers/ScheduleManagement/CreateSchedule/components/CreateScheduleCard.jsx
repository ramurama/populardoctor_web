import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Container,
  Button,
  ButtonToolbar
} from "reactstrap";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { addSchedule, emptyField } from "../constants/AddScheduleConfig";
import * as Action from "../../../../redux/actions/scheduleActions";
import validate from "../../../../components/Form/FormValidation/components/validate";
import RenderSelectField from "../../../../components/shared/components/form/Select";
import renderTimePickerField from "../../../../components/shared/components/form/TimePicker";
import renderToggleButtonField from "../../../../components/shared/components/form/ToggleButton";
import { UNDERSCORE } from "../../../../constants/utils";

const moment = require("moment");
const weekDays = [
  {
    value: "Mon",
    label: "MON"
  },
  {
    value: "Tue",
    label: "TUE"
  },
  {
    value: "Wed",
    label: "WED"
  },
  {
    value: "Thu",
    label: "THU"
  },
  {
    value: "Fri",
    label: "FRI"
  },
  {
    value: "Sat",
    label: "SAT"
  },
  {
    value: "Sun",
    label: "SUN"
  }
];
const TokenType = [
  {
    label: "PREMIUM",
    value: "premium"
  },
  {
    label: "REGULAR",
    value: "regular"
  }
];

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

class CreateScheduleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenList: [
        {
          id: 0,
          tokenNo: "",
          type: {},
          tokenTime: "",
          startTime: null,
          endTime: null
        }
      ],
      isFastrack: false
    };
  }
  componentWillMount() {
    this.props.getDoctorList();
    this.props.getHospitalList();
  }

  _handleSubmit = ({
    doctor = "",
    hospital = "",
    weekday = "",
    fastrack = false,
    fromTime = "",
    toTime = ""
  }) => {
    const editValue = {
      doctor,
      hospital,
      weekday,
      fromTime,
      toTime
    };
    const { tokenList } = this.state;
    const errorText = {};
    console.log(editValue);
    Object.keys(editValue).forEach(key =>
      this._validateScheduleFields(key, editValue[key], errorText)
    );
    this._validateTokens(this._parseToken(tokenList, fastrack), errorText);
    const error = Object.keys(errorText).filter(key => !!errorText[key]).length;
    if (error !== 0) {
      if (!UNDERSCORE.isEmpty(errorText.tokens)) {
        this.setState({ errorToken: errorText.tokens });
      } else {
        this.setState({ errorToken: "" });
      }
      throw new SubmissionError(errorText);
      return;
    }
    // this._validateTokens(this._parseToken(tokenList, fastrack));
    editValue.tokens = this._parseToken(tokenList, fastrack);
    editValue.startTime = moment(editValue.fromTime).format("hh:mm A");
    editValue.endTime = moment(editValue.toTime).format("hh:mm A");
    editValue.hospitalId = this.findIdInList(
      editValue.hospital.value,
      this.props.hospitalList,
      "hospitalId"
    );
    editValue.doctorId = this.findIdInList(
      editValue.doctor.value,
      this.props.doctorList,
      "doctorId"
    );
    editValue.weekday = editValue.weekday.value;
    this.setState({ active: true });
    Action.save(editValue).then(response => {
      console.log(response);
      // this.setState({
      //   ...this.clearState(),
      //   open: true,
      //   vertical: "top",
      //   horizontal: "right"
      // });
    });
  };

  findIdInList = (value, list, key) => {
    return list.filter(data => data.pdNumber === value)[0][key];
  };
  _parseList = (dataList, key, id) => {
    return dataList
      ? dataList.map(data => ({
          value: data[key],
          label: data.name,
          id: data[id]
        }))
      : [];
  };

  _parseToken = (tokenList, fastrack) => {
    const dataList = [];
    tokenList.forEach(token => {
      if (
        !UNDERSCORE.isEmpty(token.tokenNo) &&
        !UNDERSCORE.isEmpty(token.tokenType) &&
        !UNDERSCORE.isEmpty(token.startTime) &&
        !UNDERSCORE.isEmpty(token.endTime)
      ) {
        const data = {
          tokenNo: token.tokenNo,
          tokenType: token.tokenType,
          tokenTime: `${token.startTime} - ${token.endTime}`
        };
        dataList.push(data);
      }
    });
    if (fastrack) {
      dataList.push({
        tokenNo: 0,
        tokenType: "FASTRACK",
        tokenTime: "Can visit on your arival"
      });
    }
    return dataList;
  };

  _validateScheduleFields = (key, value, errorText) => {
    if (UNDERSCORE.isEmpty(value)) {
      errorText[key] = addSchedule[key].emptyField;
      if (addSchedule[key].type === "date" && !!value) {
        errorText[key] = "";
      }
    }
  };

  _validateTokens = (tokenList, errorText) => {
    if (tokenList.length === 0) {
      errorText.tokens = emptyField;
    }
  };

  _handleAddToken = index => {
    const { tokenList } = this.state;
    tokenList.push({
      id: index,
      tokenNo: "",
      tokenType: "",
      tokenTime: "",
      startTime: null,
      endTime: null
    });
    this.setState({
      tokenList
    });
  };

  _handleDeleteToken = value => {
    const { tokenList } = this.state;
    if (tokenList.length === 1) {
      return;
    }
    const updatedToken = tokenList.filter(
      data => !UNDERSCORE.isEqual(data, value)
    );
    this.setState({ tokenList: updatedToken });
  };

  _handleTokenChange = (index, key, event) => {
    const { tokenList } = this.state;
    tokenList.forEach(token => {
      if (token.id === index) {
        token[key] = event;
      }
    });
  };

  _handleFastrack = value => {
    this.setState({
      isFastrack: value
    });
  };

  renderTokenList = () => {
    const { tokenList } = this.state;
    return (
      <div>
        {tokenList &&
          tokenList.map((data, index) => (
            <div>
              <div className="form__form-group">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Field
                    name={"tokentype" + index}
                    component={RenderSelectField}
                    onChange={event =>
                      this._handleTokenChange(index, "tokenType", event.value)
                    }
                    type="text"
                    placeholder="Type"
                    width={100}
                    options={TokenType}
                  />
                  <Field
                    name={"tokenNo" + index}
                    component={renderField}
                    onChange={event =>
                      this._handleTokenChange(
                        index,
                        "tokenNo",
                        event.target.value
                      )
                    }
                    type="number"
                    value={data.tokenNo}
                    placeholder="Token No"
                  />
                  <Field
                    name="startTime"
                    component={renderTimePickerField}
                    onChange={event =>
                      this._handleTokenChange(
                        index,
                        "startTime",
                        event.format("hh:mm A")
                      )
                    }
                    placeholder="Start time"
                    width={100}
                    timeMode
                  />
                  <Field
                    name="endTime"
                    component={renderTimePickerField}
                    onChange={event =>
                      this._handleTokenChange(
                        index,
                        "endTime",
                        event.format("hh:mm A")
                      )
                    }
                    placeholder="End time"
                    width={100}
                    timeMode
                  />
                </div>
                <ButtonToolbar>
                  <Button
                    className="icon"
                    onClick={() => this._handleDeleteToken(data)}
                  >
                    <span class="lnr lnr-trash" />
                  </Button>
                  {tokenList.length - 1 === index && (
                    <Button
                      outline
                      onClick={() => this._handleAddToken(index + 1)}
                    >
                      <span class="lnr lnr-plus-circle" />
                    </Button>
                  )}
                </ButtonToolbar>
              </div>
            </div>
          ))}
      </div>
    );
  };

  setEmptyData = columns => {
    const data = [];
    const obj = {};
    columns.forEach(column => (obj[column.id] = ""));
    data.push(obj);
    return data;
  };

  render() {
    const { pristine, reset, submitting, handleSubmit } = this.props;
    const { errorToken } = this.state;
    const doctorList = this._parseList(
      this.props.doctorList,
      "pdNumber",
      "doctorId"
    );
    const hospitalList = this._parseList(
      this.props.hospitalList,
      "pdNumber",
      "hospitalid"
    );

    return (
      <Container>
        <form
          className="form form--horizontal"
          onSubmit={handleSubmit(this._handleSubmit)}
        >
          <Card>
            <CardBody>
              <Row>
                <Col md={12} sm={12}>
                  <div style={{ float: "right" }}>
                    <ButtonToolbar className="form__button-toolbar">
                      <Button color="primary" type="submit" size="sm">
                        Save
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        onClick={reset}
                        disabled={pristine || submitting}
                      >
                        Cancel
                      </Button>
                    </ButtonToolbar>
                  </div>
                </Col>
              </Row>
              <Row>
                <div>
                  <div className="form__form-group">
                    <h5 className="bold-text">Add Schedule</h5>
                  </div>
                  <Col md={6} sm={12}>
                    <div className="form__form-group">
                      <span className="form__form-group-label">Doctor</span>
                      <div className="form__form-group-field">
                        <Field
                          name="doctor"
                          component={RenderSelectField}
                          type="text"
                          placeholder="Doctor"
                          width={240}
                          options={doctorList}
                          renderId={true}
                        />
                      </div>
                    </div>
                    <div className="form__form-group">
                      <span className="form__form-group-label">Hospital</span>
                      <div className="form__form-group-field">
                        <Field
                          name="hospital"
                          component={RenderSelectField}
                          type="text"
                          renderId={true}
                          placeholder="Hospital"
                          width={240}
                          options={hospitalList}
                        />
                      </div>
                    </div>
                    <div className="form__form-group">
                      <span className="form__form-group-label">Weekday</span>
                      <div className="form__form-group-field">
                        <Field
                          name="weekday"
                          component={RenderSelectField}
                          type="text"
                          placeholder="Weekday"
                          width={120}
                          options={weekDays}
                        />
                      </div>
                    </div>
                    <div className="form__form-group">
                      <span className="form__form-group-label">Start time</span>
                      <div className="form__form-group-field">
                        <Field
                          name="fromTime"
                          component={renderTimePickerField}
                          placeholder="Start time"
                          timeMode
                          width={120}
                        />
                      </div>
                    </div>
                    <div className="form__form-group">
                      <span className="form__form-group-label">End time</span>
                      <div className="form__form-group-field">
                        <Field
                          name="toTime"
                          component={renderTimePickerField}
                          placeholder="End time"
                          timeMode
                          width={120}
                        />
                      </div>
                    </div>
                  </Col>
                </div>
              </Row>
              <Row>
                <Col>
                  <div>
                    <div className="form__form-group">
                      <h5 className="bold-text">Add Token</h5>
                      {errorToken && (
                        <span className="form__form-group-error">
                          {errorToken}
                        </span>
                      )}
                    </div>
                    <div className="form__form-group">
                      <span className="form__form-group-label">Fastrack</span>
                      <div className="form__form-group-field">
                        <Field
                          name="fastrack"
                          component={renderToggleButtonField}
                          placeholder="Fastrack"
                          onChange={this._handleFastrack}
                        />
                      </div>
                    </div>
                    {this.renderTokenList()}
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </form>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  const scheduleState = state.schedule;
  return {
    doctorList: scheduleState.doctorMasterList,
    hospitalList: scheduleState.hospitalMasterList,
    scheduleList:
      !UNDERSCORE.isEmpty(scheduleState) &&
      !UNDERSCORE.isEmpty(scheduleState.scheduleList)
        ? scheduleState.scheduleList
        : []
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getDoctorList: () => {
      dispatch(Action.getDoctorList());
    },
    getHospitalList: () => {
      dispatch(Action.getHospitalList());
    },
    getScheduleList: doctorId => {
      dispatch(Action.getScheduleList(doctorId));
    }
  };
}
CreateScheduleCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateScheduleCard);
export default reduxForm({
  form: "doctor", // a unique identifier for this form
  validate
})(withTranslation("common")(CreateScheduleCard));
