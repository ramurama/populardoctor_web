import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import EditTable from '../../../../shared/components/table/EditableTable';

export default class EditableTable extends PureComponent {
  getRandomDate = (start, end) => new Date(start.getTime() + (Math.random() * (end.getTime()
    - start.getTime()))).toLocaleDateString();


  render() {
    const { data } = this.props;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <EditTable heads={this.props.columns} rows={data} />
          </CardBody>
        </Card>
      </Col>
    );
  }
}
