import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import EditTable from './components/EditableTable';

class  EditableTable extends React.Component {
	

	render(){
		return (
				<Container>
					<Row>
						<EditTable {...this.props}/>
					</Row>
				</Container>
		);
	}

};

export default EditableTable;
