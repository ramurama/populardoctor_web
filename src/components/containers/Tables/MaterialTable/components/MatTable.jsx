import React, { PureComponent } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Checkbox from '@material-ui/core/Checkbox';
import MatTableHead from './MatTableHead';
import { UNDERSCORE } from '../../../../../constants/utils';

function getSort(value, order, orderBy) {
  return order === 'desc'
    ? UNDERSCORE.sortBy(value, orderBy)
    : UNDERSCORE.chain(value)
        .sortBy('user.age')
        .reverse()
        .value();
}

const style = {
  tableBody: {
    overflow: 'scroll',
    height: '100%'
  }
};
export default class MatTable extends PureComponent {
  state = {
    order: 'asc',
    orderBy: '_id',
    selected: [],
    page: 0,
    rowsPerPage: 5
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    const { orderBy: stateOrderBy, order: stateOrder } = this.state;

    if (stateOrderBy === property && stateOrder === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleDeleteSelected = () => {
    const { data } = this.state;
    let copyData = [...data];
    const { selected } = this.state;

    for (let i = 0; i < selected.length; i += 1) {
      copyData = copyData.filter(obj => obj.id !== selected[i]);
    }

    this.setState({ data: copyData, selected: [] });
  };

  isSelected = id => {
    const { selected } = this.state;
    return selected.indexOf(id) !== -1;
  };

  render() {
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const { columns, showCheckbox, data } = this.props;
    let _data = [];
    if (data && data.length !== 0) {
      _data = getSort(data, order, orderBy).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
    }

    return (
        <div className='material-table__wrap' >
          <Table className='material-table'>
            <MatTableHead
              numSelected={selected.length}
              order={order}
              columns={this.props.columns}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody classes={style.tableBody}>
              {_data.map(d => {
                const isSelected = this.isSelected(d._id);
                return (
                  <TableRow
                    className='material-table__row'
                    role='checkbox'
                    onClick={event => this.handleClick(event, d._id)}
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={d._id}
                    selected={isSelected}
                  >
                    {showCheckbox && (
                      <TableCell
                        className='material-table__cell'
                        padding='checkbox'
                      >
                        <Checkbox
                          checked={isSelected}
                          className='material-table__checkbox'
                        />
                      </TableCell>
                    )}
                    {columns.map(key => {
                      return (
                        <TableCell component='th' scope='row' padding='default'>
                          {key.render ? key.render(d) : d[key.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
						<TableFooter>
            <TableRow>
							<TablePagination
								component='div'
								className='material-table__pagination'
								count={data.length}
								rowsPerPage={rowsPerPage}
								page={page}
								backIconButtonProps={{ 'aria-label': 'Previous Page' }}
								nextIconButtonProps={{ 'aria-label': 'Next Page' }}
								onChangePage={this.handleChangePage}
								onChangeRowsPerPage={this.handleChangeRowsPerPage}
								rowsPerPageOptions={[100, 75, 50, 25, 5]}
							/>
						</TableRow>
						</TableFooter>
          </Table>
        </div>
    );	
  }
}
