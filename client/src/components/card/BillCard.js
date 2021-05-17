import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import url from 'src/utils/developURL';

const BillCard = (props) => {
  const [billData, setBillData] = useState([]);

  var user = localStorage.getItem('user');
  try {
    user = JSON.parse(user);
  } catch(err) {
    console.error(err.message);
  }

  const getData = () => {
    axios.get(url + '/api/user/checkbill', {
        params: {bname: user.bname, roomid: user.roomid}
    })
    .then(res => {
        setBillData(res.data);
    })
    .catch(err => console.error(err.message));
  };

  useEffect(() => {
    getData()
  }, [])

  return (
      <Card>
        <CardHeader
          subheader={`ตึก ${user.bname} ห้อง ${user.roomid}`}
          title="รายการค่าใช้จ่าย"
        />
        <Divider />
        <CardContent>
        <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  เลขใบเสร็จ
                </TableCell>
                <TableCell>
                  รายละเอียด
                </TableCell>
                <TableCell>
                  ค่าปรับ
                </TableCell>
                <TableCell>
                  วันสุดท้าย
                </TableCell>
                <TableCell>
                  สถานะการจ่าย
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billData.slice(0, billData.length).map((data, index) => (
                <TableRow
                  hover
                  key={index}
                >
                  <TableCell>
                    {data.billid}
                  </TableCell>
                  <TableCell>
                    {data.costname}
                  </TableCell>
                  <TableCell>
                    {data.fine}
                  </TableCell>
                  <TableCell>
                    {data.due_date}
                  </TableCell>
                  <TableCell>
                    {data.status? 
                        <CheckCircleRoundedIcon style={{color: 'green'}} />:
                        <RemoveCircleRoundedIcon style={{color: 'red'}} />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
        </Box>
      </Card>
  );
};

export default BillCard;
