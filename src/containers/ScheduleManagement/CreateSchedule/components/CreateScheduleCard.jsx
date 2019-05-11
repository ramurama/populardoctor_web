import React from "react";
import { Card, CardBody, Row, Col, Container, Button, ButtonToolbar } from "reactstrap";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import AddIcon from "mdi-react/AddIcon";
import DeleteIcon from "mdi-react/DeleteIcon";
import * as Action from "../../../../redux/actions/scheduleActions";
import validate from "../../../../components/Form/FormValidation/components/validate";
import renderSelectField from "../../../../components/shared/components/form/Select";
import renderDatePicker from "../../../../components/shared/components/form/DatePicker";
import renderToggleButtonField from "../../../../components/shared/components/form/ToggleButton";
import { UNDERSCORE } from "../../../../constants/utils";

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
		label: 'PREMIUM',
		value: 'premium'	
	},
	{
		label: 'REGULAR',
		value: 'regular'	
	},
];


class CreateScheduleCard extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			tokenList: [{
				tokenNo: '',
				type: {},
				tokenTime: '',
				startTime: null,
				endTime: null,
			}],
		}
	}
  componentWillMount() {
    this.props.getDoctorList();
    this.props.getHospitalList();
  }

  _handleSubmit = () => {};
  _parseList = (dataList, key) => {
    return dataList
      ? dataList.map(data => ({ value: data[key], label: data.name }))
      : [];
	};
	
	_handleAddToken = () => {
		const {
			tokenList
		} = this.state;
		tokenList.push({
			tokenNo: '',
			tokenType: '',
			tokenTime: '',
			startTime: null,
			endTime: null,
		});
		this.setState({
			tokenList
		})
	}
	renderTokenList = () => {
		const { tokenList } = this.state;
		return (<div>
			{tokenList && tokenList.map((data, index) => 
		<div>
		<div className="form__form-group">
			<div style={{ display: 'flex', flexDirection: 'row'}} >
				<div style={{padding: 8}}>
					<Field
						name={"tokentype"+index}
						component={renderSelectField}
						type="text"
						placeholder="Type"
						width={100}
						options={TokenType}
					/>
				</div>
				<div style={{padding: 8}}>
					<Field
						name="endTime"
						component={renderDatePicker}
						placeholder="End time"
						width={100}
					/>
				</div>
				<div style={{padding: 8}}>
					<Field
						name="startTime"
						component={renderDatePicker}
						placeholder="Start time"
						width={100	}
					/>
				</div>
				</div>
				<ButtonToolbar>
				<Button className="icon" >
					<span class="lnr lnr-trash"></span>
				</Button>
				{tokenList.length-1 === index && 
				<Button  outline onClick={() => this._handleAddToken()}>
					<span class="lnr lnr-plus-circle"></span>
				</Button>}
				</ButtonToolbar>
		</div>
			</div>)}
		</div>);
	}

  render() {
    const { handleSubmit } = this.props;

    const doctorList = this._parseList(this.props.doctorList, "pdNumber");
    const hospitalList = this._parseList(this.props.hospitalList, "pdNumber");

    return (
      <Col md={12}>
        <Card>
          <CardBody>
            <form
              className="form form--horizontal"
              onSubmit={handleSubmit(this._handleSubmit)}
            >
              <Container>
                <Row>
                  <Col md={6} sm={12}>
                    <div className="form__form-group">
                      <h5 className="bold-text">Add Schedule</h5>
                    </div>
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
                          name="startTime"
                          component={renderDatePicker}
                          placeholder="Start time"
                          width={120}
                        />
                      </div>
                    </div>
                    <div className="form__form-group">
                      <span className="form__form-group-label">End time</span>
                      <div className="form__form-group-field">
                        <Field
                          name="endTime"
                          component={renderDatePicker}
                          placeholder="End time"
                          width={120}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md={6} sm={12}>
                    <div className="form__form-group">
                      <h5 className="bold-text">Add Token</h5>
                    </div>
										<div className="form__form-group">
											<span className="form__form-group-label">Fastrack</span>
											<div className="form__form-group-field">
												<Field
													name="fasttrack"
													component={renderToggleButtonField}
													placeholder="Fastrack"
												/>
											</div>
										</div>
										{this.renderTokenList()}
                  </Col>
                </Row>
              </Container>
            </form>
          </CardBody>
        </Card>
      </Col>
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
