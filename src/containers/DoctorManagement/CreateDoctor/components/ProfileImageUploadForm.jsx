import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import ReactDOM from 'react-dom';
import { Card, CardBody } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import renderDropZoneField from '../../../../components/shared/components/form/DropZone';
import EndPoints from '../../../../redux/actions/endpoints';
import { UNDERSCORE } from '../../../../constants/utils';

class ProfileImageUploadForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      doctorPdNumber: null
    };
    this.form = null;
  }

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  upload(doctorPdNumber) {
    console.log('upload called');
    this.setState({ doctorPdNumber }, () =>
      ReactDOM.findDOMNode(this.form).dispatchEvent(new Event('submit'))
    );
  }

  _handleSubmit = ({ profileImage }) => {
		if(UNDERSCORE.isEmpty(profileImage)){
			return;
		}
    const formData = new FormData();
    formData.append(
      'profileImage',
      profileImage[0],
      this.state.doctorPdNumber + '.png'
    );

    fetch(EndPoints.uploadProfileImage + '/' + this.state.doctorPdNumber, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        this.props.reset();
        this.props.onUploadComplete(res.status);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <Card style={{ height: 150 }}>
        <CardBody>
          <div className='card__title'>
            <h5 className='subhead'>Profile Image</h5>
          </div>
          <form
            ref={element => (this.form = element)}
            className='form'
            onSubmit={handleSubmit(this._handleSubmit)}
          >
            <Field name='profileImage' component={renderDropZoneField} />
          </form>
        </CardBody>
      </Card>
    );
  }
}

export default reduxForm({
  form: 'doctorPofileImageUpload'
})(withTranslation('common')(ProfileImageUploadForm));
