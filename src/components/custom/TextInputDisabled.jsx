import React from 'react';

export default props => (
  <div className="form__form-group">
    <span className="form__form-group-label">{props.label}</span>
    <div className="form__form-group-field">
      <input type="text" value={props.value} disabled />
    </div>
  </div>
);
