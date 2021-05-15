import { useState } from 'react';
import PropTypes from 'prop-types';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';

const RoomListResults = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer, index) => index);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  ตึก
                </TableCell>
                <TableCell>
                  ห้อง
                </TableCell>
                <TableCell>
                  จำนวนห้องน้ำ
                </TableCell>
                <TableCell>
                  จำนวนห้องนอน
                </TableCell>
                <TableCell>
                  ความจุคน
                </TableCell>
                <TableCell>
                  สถานะ
                </TableCell>
                <TableCell>
                  ราคาห้องต่อเทอม
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.roomid}
                  selected={selectedCustomerIds.indexOf(customer.roomid) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.roomid) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.roomid)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {customer.bname}
                  </TableCell>
                  <TableCell>
                    {customer.roomid}
                  </TableCell>
                  <TableCell>
                    {customer._wc}
                  </TableCell>
                  <TableCell>
                    {customer._bedroom}
                  </TableCell>
                  <TableCell>
                    {customer._roomer}
                  </TableCell>
                  <TableCell>
                    {customer._status? 
                      <CheckCircleRoundedIcon style={{color: 'green'}} />:
                      <RemoveCircleRoundedIcon style={{color: 'red'}} />
                    }
                  </TableCell>
                  <TableCell>
                    {`${customer.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'THB'
                    })}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

RoomListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default RoomListResults;
