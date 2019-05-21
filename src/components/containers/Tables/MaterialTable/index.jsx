import React from 'react';
import { Container, Row } from 'reactstrap';
import MatTable from './components/MatTable';

class  MaterialTable extends React.Component {
	

	render(){
		return (
				<Container>
					<Row>
						<MatTable {...this.props}/>
					</Row>
				</Container>
		);
	}

};

export default MaterialTable;
