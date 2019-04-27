/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import { Container } from 'reactstrap';
import NotificationSystem from 'rc-notification';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { BasicNotification } from './components/Notification';

let notificationRU = null;

const showNotification = (show, title, message) => {
	alert(show)
	if(!show){
		return;
	}
	return notificationRU.notice({
		content: <BasicNotification
			title={title}
			message={message}
		/>,
		duration: 5,
		closable: true,
		style: { top: 0, left: 'calc(100vw - 100%)' },
		className: 'right-up',
	});
};

class Notifications extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  componentDidMount() {
    NotificationSystem.newInstance({}, n => notificationRU = n);
  }

  componentWillUnmount() {
    notificationRU.destroy();
  }

  render() {
		const { show, title, message} = this.props;

    return (
      <Container>
					{/* <BasicNotifications 
						showNotification={showNotification} 
						show={show}
						title={title}
						message={message}
					/> */}
					{showNotification(show, title, message)}
      </Container>
    );
  }
}

export default withTranslation('common')(Notifications);
