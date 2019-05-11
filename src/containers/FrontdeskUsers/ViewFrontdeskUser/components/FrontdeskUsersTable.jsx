import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import MaterialTable from '../../../../components/containers/Tables/MaterialTable';
import UserBlockToggle from '../../../../components/user/userBlockToggle';

const FrontdeskUsersTable = props => {
  const columns = [
    { id: 'fullName', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'username', numeric: false, disablePadding: true, label: 'Contact' },
    {
      id: 'action',
      label: 'Block/Unblock',
      render: row => (
        <UserBlockToggle
          data={row}
          status={row.status}
          id={row._id}
          loadData={() => props.refreshTable()}
          afterToggle={value => props.onActionComplete(value)}
        />
      )
    }
  ];
  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          {/* <div className="card__title">
            <h5 className="bold-text">Previous Announcements</h5>
          </div> */}
          <MaterialTable columns={columns} data={props.data} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default FrontdeskUsersTable;
