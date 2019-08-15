import React, { PureComponent } from 'react';
import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'
import PropTypes from 'prop-types';

class DatePickerField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };


  render() {
		const { value, onChange } = this.props;
    return (
      <Flatpickr
				value={value}
				placeholder="Date of Birth"
				dateFormat= "Y-m-d"
        onChange={date => {onChange(date) }} />
    )
  }
}

const renderDatePickerField = (props) => {
	const {  input, meta, width } = props;
	return (<div>
     	<DatePickerField {...input}  width={width}/>
      {meta.touched && meta.error && <span className="form__form-group-error">{meta.error}</span>}
    </div>
  );
   
};

renderDatePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
};

export default renderDatePickerField;
