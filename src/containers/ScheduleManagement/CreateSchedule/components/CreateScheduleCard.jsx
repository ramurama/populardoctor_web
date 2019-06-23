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
import { withRouter } from "react-router";
import { withTranslation } from "react-i18next";
import { addSchedule, emptyField } from "../constants/AddScheduleConfig";
import * as Action from "../../../../redux/actions/scheduleActions";
import validate from "../../../../components/Form/FormValidation/components/validate";
import RenderSelectField from "../../../../components/shared/components/form/Select";
import renderTimePickerField from "../../../../components/shared/components/form/TimePicker";
import renderToggleButtonField from "../../../../components/shared/components/form/ToggleButton";
import { UNDERSCORE } from "../../../../constants/utils";
import Snackbar from "@material-ui/core/Snackbar";

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
    value: "PREMIUM"
  },
  {
    label: "REGULAR",
    value: "REGULAR"
  }
];

const fastrack = {
  number: 0,
  type: "FASTTRACK",
  time: "Can visit on your arival"
};

const emptyToken = [
  {
    id: 0,
    number: "",
    type: {},
    time: "",
    startTime: null,
    endTime: null,
    showSnackBar: false,
    snackBarMessage: ""
  }
];
const renderField = ({
  input,
  placeholder,
  type,
  width,
  disabled,
  meta: { touched, error }
}) => {

  return (
    <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
      <div style={{ width: width }}>
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
    </div>
  );
};

class CreateScheduleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenList: emptyToken,
      isFastrack: false,
      existTokens: [],
			updated: false,
			deleteTokens: []
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const pathName = location.pathname;
    if (pathName.includes("edit")) {
      const pdNumber = pathName.split("/")[pathName.split("/").length - 1];
      this.props.getScheduleDetail(pdNumber);
    }
  }
  componentWillMount() {
    this.props.getDoctorList();
    this.props.getHospitalList();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isUpdate && UNDERSCORE.isEmpty(prevState.existTokens) && !prevState.updated) {
      return { existTokens: nextProps.initialValues.tokens };
    } else return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isUpdate && !prevState.updated) {
      const { isFastrack, dataList } = this._decodeTokenList(
        prevState.existTokens
			);
      this._handleFastrack(isFastrack);
      this.setState({ isFastrack, existTokens: dataList, updated: true });
    }
  }
  _decodeTokenList = tokenList => {
    let isFastrack = false;
    const dataList = [];
    tokenList &&
      tokenList.forEach((map, index) => {
        if (UNDERSCORE.isEqual(map, fastrack)) {
          isFastrack = true;
        }
        if (!UNDERSCORE.isEqual(map, fastrack)) {
          dataList.push({
            id: index,
            number: map.number,
            type: map.type,
            startTime: map.time.split(" - ")[0],
            endTime: map.time.split(" - ")[1]
          });
        }
      });
    return {
      isFastrack,
      dataList
    };
  };
  _handleSubmit = ({
    doctor = "",
    hospital = "",
    weekday = "",
    isFastrack = false,
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
   if(this.props.isUpdate){
		return this._updateSchedule();
	 }else{
		 return this._addSchedule(editValue, isFastrack);
	 }
  };
	_updateSchedule = () => {
		const { deleteTokens, tokenList, isFastrack } = this.state;
		const token = {
			deleteTokens,
			tokenList,
		};
		if(this.props.initialValues.isFastrack !== isFastrack){
			if(isFastrack){
				tokenList.push(fastrack)
			}else{
				deleteTokens.push({number : 0})
			}
		}
	}
	_addSchedule = (editValue, isFastrack) => {
		const { tokenList } = this.state;
    const errorText = {};
    Object.keys(editValue).forEach(key =>
      this._validateScheduleFields(key, editValue[key], errorText)
    );
    this._validateTokens(this._parseToken(tokenList, isFastrack), errorText);
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
    Action.save(editValue)
      .then(response => response.json())
      .then(response => {
        this.setState({
          showSnackBar: true,
          snackBarMessage: response.message
        });
      });
	}
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
        !UNDERSCORE.isEmpty(token.number) &&
        !UNDERSCORE.isEmpty(token.type) &&
        !UNDERSCORE.isEmpty(token.startTime) &&
        !UNDERSCORE.isEmpty(token.endTime)
      ) {
        const data = {
          number: parseInt(token.number),
          type: token.type,
          time: `${token.startTime} - ${token.endTime}`
        };
        dataList.push(data);
      }
    });
    if (fastrack) {
      dataList.push({
        number: 0,
        type: "FASTTRACK",
        time: "Can visit on your arival"
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
	_handleExistDeleteToken  = (data) => {
		const { existTokens, deleteTokens } = this.state;
		deleteTokens.push({number: data.number});
		const dataList = existTokens.filter((map) => !UNDERSCORE.isEqual(data, map));
		this.setState({
			deleteTokens,
			existTokens: dataList
		});
	}

  _handleFastrack = value => {
    this.setState({
      isFastrack: value
    });
  };

  renderTokenList = () => {
    const { tokenList, existTokens } = this.state;
    return (
      <div>
        {existTokens &&
          existTokens.map(data => data.number !==0 && (
            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: 120, padding: "0px 8px" }}>
                  <input
                    width={100}
                    value={data.type}
                    type="text"
                    disabled={this.props.isUpdate}
                  />
                </div>
                <div style={{ width: 100, padding: "0px 8px" }}>
                  <input
                    width={100}
                    value={data.number}
                    type="text"
                    disabled={this.props.isUpdate}
                  />
                </div>
                <div style={{ width: 120, padding: "0px 8px" }}>
                  <input
                    width={100}
                    value={data.startTime}
                    type="text"
                    disabled={this.props.isUpdate}
                  />
                </div>
                <div style={{ width: 120, padding: "0px 8px" }}>
                  <input
                    width={100}
                    value={data.endTime}
                    type="text"
                    disabled={this.props.isUpdate}
                  />
                </div>

                <Button
                  className="icon btn-danger"
                  onClick={() => this._handleExistDeleteToken(data)}
                >
                  <span class="lnr lnr-trash text-white" />
                </Button>
              </div>
            </div>
          ))}
        {tokenList &&
          tokenList.map((data, index) => (
            <div>
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ width: 120, padding: "0px 8px" }}>
                    <Field
                      name={"type" + index}
                      component={RenderSelectField}
                      onChange={event =>
                        this._handleTokenChange(index, "type", event.value)
                      }
                      type="text"
                      placeholder="Type"
                      width={100}
                      options={TokenType}
                    />
                  </div>
                  <div style={{ width: 100, padding: "0px 8px" }}>
                    <Field
                      name={"number" + index}
                      component={renderField}
                      onChange={event =>
                        this._handleTokenChange(
                          index,
                          "number",
                          event.target.value
                        )
                      }
                      type="number"
                      value={data.number}
                      placeholder="Token No"
                    />
                  </div>
                  <div style={{ width: 120, padding: "0px 8px" }}>
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
                  </div>
                  <div style={{ width: 120, padding: "0px 8px" }}>
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

                  <Button
                    className="icon btn-danger"
                    onClick={() => this._handleDeleteToken(data)}
                  >
                    <span class="lnr lnr-trash text-white" />
                  </Button>
                  {tokenList.length - 1 === index && (
                    <Button
                      className="icon btn-primary"
                      outline
                      onClick={() => this._handleAddToken(index + 1)}
                    >
                      <span class="lnr lnr-plus-circle text-white" />
                    </Button>
                  )}
                </div>
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

  _handleSnackBarClose = () => {
    this.setState({ showSnackBar: false });
  };

  render() {
    const { pristine, reset, submitting, handleSubmit, isUpdate } = this.props;
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
    const renderTimeField = isUpdate ? renderField : renderTimePickerField;
    const renderSelectField = isUpdate ? renderField : RenderSelectField;
    return (
      <Container>
        <form
          className="form form--horizontal"
          onSubmit={handleSubmit(this._handleSubmit)}
        >
          <Card>
            <CardBody>
              <div className="form__form-group">
                <h5 className="bold-text">Add Schedule</h5>
              </div>
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
                        Clear
                      </Button>
                    </ButtonToolbar>
                  </div>
                </Col>
              </Row>
              <Row>
                <div>
                  <Col md={6} sm={12}>
                    <div className="form__form-group">
                      <span className="form__form-group-label">Doctor</span>
                      <div className="form__form-group-field">
                        <Field
                          name="doctor"
                          component={renderSelectField}
                          type="text"
                          placeholder="Doctor"
                          width={240}
                          options={doctorList}
                          disabled={this.props.isUpdate}
                          renderId={true}
                        />
                      </div>
                    </div>
                    <div className="form__form-group">
                      <span className="form__form-group-label">Hospital</span>
                      <div className="form__form-group-field">
                        <Field
                          name="hospital"
                          component={renderSelectField}
                          type="text"
                          renderId={true}
                          disabled={this.props.isUpdate}
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
                          component={renderSelectField}
                          type="text"
                          disabled={this.props.isUpdate}
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
                          component={renderTimeField}
                          placeholder="Start time"
                          disabled={this.props.isUpdate}
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
                          component={renderTimeField}
                          disabled={this.props.isUpdate}
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
                          name="isFastrack"
                          component={renderToggleButtonField}
                          placeholder="Fastrack"
                          value={this.state.isFastrack}
                          onChange={this._handleFastrack}
                        />
                      </div>
                    </div>
                    {this.renderTokenList()}
                  </div>
                </Col>
              </Row>
            </CardBody>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              autoHideDuration={3000}
              open={this.state.showSnackBar}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              onClose={this._handleSnackBarClose}
              message={
                <span id="message-id">{this.state.snackBarMessage}</span>
              }
            />
          </Card>
        </form>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  const scheduleState = state.schedule;
  const defaultData =
    !UNDERSCORE.isEmpty(scheduleState) &&
    !UNDERSCORE.isEmpty(scheduleState.scheduleDetail)
      ? scheduleState.scheduleDetail
      : {};

  return {
    doctorList: scheduleState.doctorMasterList,
    hospitalList: scheduleState.hospitalMasterList,
    scheduleList:
      !UNDERSCORE.isEmpty(scheduleState) &&
      !UNDERSCORE.isEmpty(scheduleState.scheduleList)
        ? scheduleState.scheduleList
        : [],
    initialValues: { ...defaultData },
    isUpdate: !UNDERSCORE.isEmpty(defaultData)
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
    },
    getScheduleDetail: doctorId => {
      dispatch(Action.getScheduleDetail(doctorId));
    }
  };
}
CreateScheduleCard = reduxForm({
  form: "doctor",
  validate,
  enableReinitialize: true
})(withTranslation("common")(CreateScheduleCard));
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateScheduleCard));
