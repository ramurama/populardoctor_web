import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { BasicNotification } from './Notification';

class BasicNotifications extends PureComponent {
  static propTypes = {
    showNotification: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  render() {
		const { show } = this.props;
		console.log(show)
    return (
      <div>
				{show && this.tigger}
			</div>
    );
  }
}

export default withTranslation('common')(BasicNotifications);
