import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import "react-datepicker/dist/react-datepicker.css";

class DatePickerField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      startDate: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    const { onChange } = this.props;
    this.setState({
      startDate: date,
    });
    onChange(date);
  }

  render() {
    const { startDate } = this.state;

    return (
      <div className="date-picker">
        <DatePicker
          selected={startDate}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const renderDatePickerField = (props) => {
	const {  input, meta } = props;
	return (<div >
     	<DatePickerField {...input} />
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
