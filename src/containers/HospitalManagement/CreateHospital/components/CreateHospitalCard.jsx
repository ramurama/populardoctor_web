import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Snackbar from '@material-ui/core/Snackbar';
import { save} from "../../../../redux/actions/hospitalActions";
import validate from '../../../../components/Form/FormValidation/components/validate';
import { addHospital } from '../constants/hospitalForm';
import { UNDERSCORE } from "../../../../constants/utils";

const renderField = ({
  input, placeholder, type, meta:{ touched, error },
}) => (
  <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
    <input {...input} placeholder={placeholder} type={type} />
    {touched && error && <span className="form__form-group-error">{error}</span>}
  </div>
);

renderField.propTypes = {
  input: PropTypes.shape().isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

renderField.defaultProps = {
  placeholder: '',
  meta: null,
  type: 'text',
};

class CreateHospitalCard extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  constructor() {
    super();
    this.state = {
			showPassword: false,
			saveData: {
				name: '',
				address: '',
				location: '',
				pincode: '',
				landmark: '',
			},
			open: false,
			errorText: {},
    };
  }

	_handleChange = (key, event) =>{
		const { saveData } = this.state;
		saveData[key] = event.target.value;
		this.setState({saveData});
	}

	_handleSubmit = ({name = '',streetName ='', building ='', location='', landmark='', pincode=0}) => {
		const  saveData  = {
			name,
			streetName,
			building,
			location,
			landmark,
			pincode,
		};
		const errorText = {};
		Object.keys(saveData).forEach((key) => this.validateTextData(saveData[key], key, saveData, errorText))
		this._validatePincode(saveData.pincode, errorText);
		const error = Object.keys(errorText).filter(key => !!errorText[key]).length;
		if(error !== 0){
			console.log(errorText)
			throw new SubmissionError(errorText);
		}
		const data = {
			name: saveData.name,
			address: `${saveData.streetName} ${saveData.building}`,
			location: saveData.location,
			landmark: saveData.landmark,
			pincode: saveData.pincode,
		};
		save(data)
		.then(response => {
			this.setState({
				open: true,
			})
		})
	}

	validateTextData = (value, key, editValue, errorText) => {
		const type = addHospital[key] ? addHospital[key].type : 'other';
		if(type !== 'other'){
			if(UNDERSCORE.isEmpty(value)){
				editValue[key] = value;
				errorText[key] = addHospital[key].emptyField;
				return;
			}
			if(value.length <= addHospital[key].length){
				errorText[key] = null
				editValue[key] = value;
			}
		}
	}
	_validatePincode = (value, errorText) => {
		if(value && value.length !==0 && value.length !== addHospital['pincode'].length){
			errorText['pincode'] = addHospital['pincode'].errorText;
		}
	}
	_handleClose = () => {
		this.setState({show : false});
	}

  render() {
    const {
  		pristine, reset, submitting, handleSubmit
    } = this.props;
    return (
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Card>
          <CardBody>
            <form className="form form--horizontal" onSubmit={handleSubmit(this._handleSubmit)}>
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
                <span className="form__form-group-label">Pincode</span>
                <div className="form__form-group-field">
                  <Field
                    name="pincode"
										component={renderField}
										type="number"
										placeholder="Pincode"
										onChange={(value) => this._handleChange('pincode',value)}
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
							<ButtonToolbar className="form__button-toolbar">
                <Button color="primary" type="submit" >Save</Button>
                <Button type="button" onClick={reset} disabled={pristine || submitting}>
                  Cancel
                </Button>
              </ButtonToolbar>
            </form>
						{this.state.open && <Snackbar
							anchorOrigin={{ vertical: 'top', horizontal:'right' }}
							autoHideDuration={3000}
							open={this.state.open}
							ContentProps={{
								'aria-describedby': 'message-id',
							}}
							onClose={this._handleClose}
							message={<span id="message-id"> Hospital saved successfully</span>}
						/>}

          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default reduxForm({
  form: 'hospital', // a unique identifier for this form
  validate,
})(withTranslation('common')(CreateHospitalCard));
 