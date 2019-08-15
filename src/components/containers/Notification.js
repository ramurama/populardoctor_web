import React from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

const Notification = (props) => {
  return (
		<Toast isOpen={props.isOpen}>
			<ToastHeader>
				{props.title}
			</ToastHeader>
			<ToastBody>
				{props.message}
			</ToastBody>
		</Toast>);
}
export default Notification;