import React, { PureComponent } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

class SelectField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
      })
    ),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
      })
    ]).isRequired
  };

  static defaultProps = {
    placeholder: "",
    options: []
  };

  handleChange = selectedOption => {
		const { onChange } = this.props;
    onChange(selectedOption);
  };

	setIdWithValue = (list) =>{
		list.forEach(data => {data.label = `${data.label} (${data.value}) `})
		return list;
	}

  render() {
		const { value, name, placeholder, options, renderId } = this.props;
		let optionList = [];
		if(renderId){
			optionList = this.setIdWithValue(options);
		}else{
			optionList = options; 
		}
    return (
      <Select
        name={name}
        value={value}
        onChange={e => this.handleChange(e)}
        options={optionList}
        clearable={false}
        className="react-select"
        placeholder={placeholder}
        classNamePrefix="react-select"
      />
    );
  }
}

const RenderSelectField = props => {
  const { input, meta, options, placeholder, width, renderId, filter, onChange } = props;
  if (filter) {
    return (
      <div style={{ width: width }}>
        <SelectField
          {...input}
          options={options}
          placeholder={placeholder}
					renderId={renderId}
					onChange={onChange}
        />
      </div>
    );
  } else {
    return (
      <div className="form__form-group-input-wrap">
        <div style={{ width: width }}>
          <SelectField
            {...input}
            options={options}
            placeholder={placeholder}
            renderId={renderId}
          />
        </div>
        {meta.touched && meta.error && (
          <span style={{ width: width }} className="form__form-group-error">
            {meta.error}
          </span>
        )}
      </div>
    );
  }
};

RenderSelectField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ),
  placeholder: PropTypes.string
};

RenderSelectField.defaultProps = {
  meta: null,
  options: [],
  placeholder: ""
};

export default RenderSelectField;
