import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import TimePicker from "rc-time-picker";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";

import "rc-time-picker/assets/index.css";
import { UNDERSCORE } from "../../../../constants/utils";
const moment = require("moment");

class TimePickerField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    timeMode: PropTypes.bool.isRequired
  };

  state = {
    open: false
  };

  setOpen = ({ open }) => {
    this.setState({ open });
  };

  toggleOpen = e => {
    e.preventDefault();
    this.setState(prevState => ({ open: !prevState.open }));
  };

  render() {
		const { value, onChange, placeholder } = this.props;
		const data = UNDERSCORE.isEmpty(value) ? { value : UNDERSCORE.isEmpty(value)} : {};
    return (
      <Flatpickr
				options={{enableTime: true, noCalendar: true, dateFormat: "H:i"}}
				placeholder={placeholder}
        onChange={date => {
          onChange(date);
				}}
				{...data}
      />
    );
  }
}

const renderTimePickerField = props => {
  const { input, meta, timeMode, width } = props;
  return (
    <div className="form__form-group-input-wrap">
      <div style={{ width: width }}>
        <TimePickerField {...input} timeMode={timeMode} />
      </div>
      {meta.touched && meta.error && (
        <span className="form__form-group-error" style={{ width: width }}>
          {meta.error}
        </span>
      )}
    </div>
  );
};

renderTimePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string
  }).isRequired,
  timeMode: PropTypes.bool
};

renderTimePickerField.defaultProps = {
  timeMode: false
};

export default renderTimePickerField;
