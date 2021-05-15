import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Grid
} from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';
import { Search as SearchIcon } from 'react-feather';
import { useNavigate } from 'react-router';

const AddBill = (props) => {
  const navigate = useNavigate();
  const [bill, setBill] = useState({
    bname: '',
    roomid: null,
    due_date: '',
    costname: ''
  });

  const onChange = (e) => {
    setBill({
      ...bill,
      [e.target.name]: e.target.value
    });
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/admin/addbill`, bill)
    .then(res => {
      alert(res.data.message);
    }).catch(err => {
      console.error(err.message);
    })
  };
  
  return (
  <Box {...props}>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Grid  container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
          <Box sx={{ width: '100%' }}>
            <form onSubmit={onSubmit}>
            <Typography  color="textSecondary" gutterBottom mb={2}>
              แจ้งรายการค่าใช้จ่าย
            </Typography>
            <Grid container spacing={3} >
              <Grid item md={2} xs={12}>
                <TextField
                  fullWidth
                  label={'ชื่อตึก'}
                  placeholder="B1"
                  name="bname"
                  variant="outlined"
                  onChange={onChange}
                  value={bill.bname}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <TextField
                  fullWidth
                  label={'เลขห้อง'}
                  placeholder="205"
                  name="roomid"
                  variant="outlined"
                  onChange={onChange}
                  value={bill.roomid}
                />
              </Grid>
              <Grid item md={2.5} xs={12}>
                <TextField
                  type="date"
                  fullWidth
                  label={'วันสิ้นสุดกำหนดจ่าย'}
                  defaultValue="2021-05-20"
                  name="due_date"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={onChange}
                  value={bill.due_date}
                />
              </Grid>
              <Grid item md={3.5} xs={12}>
                <TextField
                  fullWidth
                  label={'รายละเอียดค่าใช้จ่าย'}
                  placeholder="ค่าไฟ"
                  name="costname"
                  variant="outlined"
                  onChange={onChange}
                  value={bill.costname}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <Button
                  sx={{height:'100%'}}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  ส่งรายการ
                </Button>
              </Grid>
            </Grid>
            </form>
          </Box>
            
          </Grid>
          

          
          </Grid>
        </CardContent>
      </Card>
    </Box>
  </Box>
)};

export default AddBill;
