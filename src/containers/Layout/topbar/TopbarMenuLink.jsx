import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as Action from '../../../redux/actions/loginActions';

export default class TopbarMenuLinks extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  };

	_handleLogout = () => {
		return Action.logout()
		.then ((response) => response.json())
		.then(data=> console.log('logout success'))
	}

  render() {
    const { title, icon, path } = this.props;

    return (
      <Link className="topbar__link" onClick={() => this._handleLogout()} to={path}>
        <span className={`topbar__link-icon lnr lnr-${icon}`} />
        <p className="topbar__link-title">{title}</p>
      </Link>
    );
  }
}
