import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import TimePicker from "rc-time-picker";

import "rc-time-picker/assets/index.css";
const  moment  = require("moment");

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
    const { name, onChange, timeMode , value } = this.props;
    const { open } = this.state;

    return (
      <TimePicker
        open={open}
        onOpen={this.setOpen}
        onClose={this.setOpen}
				name={name}
        onChange={onChange}
        showSecond={false}
        use12Hours={timeMode}
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
