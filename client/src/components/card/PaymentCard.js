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

const PaymentCard = ({ payments, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = payments.map((payment, index) => index);
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
    <Card {...rest} mt={3}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === payments.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < payments.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  รหัสใบเสร็จ
                </TableCell>
                <TableCell>
                  ตึก/เลขที่ห้อง
                </TableCell>
                <TableCell>
                  ชื่อรายการค่าใช้จ่าย
                </TableCell>
                <TableCell>
                  วันที่ชำระเงิน
                </TableCell>
                <TableCell>
                  จำนวนเงิน
                </TableCell>
                <TableCell>
                  ค่าปรับ
                </TableCell>
                <TableCell>
                  สถานะ
                </TableCell>
                <TableCell>
                ช่องทางการชำระเงิน
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.slice(page * limit, page * limit + limit).map((payment) => (
                <TableRow
                  hover
                  key={payment.billid}
                  selected={selectedCustomerIds.indexOf(payment.billid) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(payment.billid) !== -1}
                      onChange={(event) => handleSelectOne(event, payment.billid)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {payment.billid}
                  </TableCell>
                  <TableCell>
                    {payment.bname + ' / ' + payment.roomid}
                  </TableCell>
                  <TableCell>
                    {payment.costname}
                  </TableCell>
                  <TableCell>
                    {payment.pay_date? payment.pay_date: 'ค้างชำระ'}
                  </TableCell>
                  <TableCell>
                    {`${payment.cost? payment.cost.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'THB'
                    }): ''} `}
                  </TableCell>
                  <TableCell>
                    {`${payment.fine? payment.fine.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'THB'
                    }): ''}`}
                  </TableCell>
                  <TableCell>
                    {payment.status? 'จ่ายแล้ว':'ค้างชำระ'}
                  </TableCell>
                  <TableCell>
                    {payment.paidType? (payment.paidType === 'bank_payment'? 'ธนาคาร':'บัตรเครดิต'): ''}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={payments.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Card>
  );
};

PaymentCard.propTypes = {
  payments: PropTypes.array.isRequired
};

export default PaymentCard;
