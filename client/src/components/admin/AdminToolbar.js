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
import url from 'src/utils/developURL';

const AdminToolbar = (props) => {
  const navigate = useNavigate();
  const [ssn, setSsn] = useState('');
  const [room, setRoom] = useState({
    bname: 'B1',
    roomid: 205
  });

  const onSsnChange = (e) => {
    setSsn(e.target.value);
  };

  const onRoomChange = (e) => {
    setRoom({
      ...room,
      [e.target.name]: e.target.value
    });
  }
  
  const onContractSubmit = (e) => {
    e.preventDefault();
    axios.get(url() + `/api/user/contract/${ssn}`)
    .then(res => {
      console.log('contracts: ',res.data);
      navigate('/app/admin', { state: { contracts: res.data}}); 
    }).catch(err => {
      console.error(err.message);
    })
  };

  const onRoomDataSubmit = (e) => {
    e.preventDefault();
    axios.get(url() + `/api/admin/${room.bname}/${room.roomid}`)
    .then(res => {
      console.log('room data: ',res.data);
      navigate('/app/admin', { state: { people: res.data}});
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
          <Grid item lg={6} md={6} xs={12}>
            <Box sx={{ width: '75%' }}>
            <form onSubmit={onContractSubmit}>
              <Typography  color="textSecondary" gutterBottom mb={2}>
                ตรวจสอบสัญญารายบุคคล
              </Typography>
              <Grid container spacing={3} >
                <Grid item md={10} xs={12}>
                  <TextField
                    fullWidth
                    helperText={'ป้อนเลขรหัสประจำตัวประชาชนเพื่อค้นข้อมูล'}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon
                            fontSize="small"
                            color="action"
                          >
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    placeholder="รหัสประจำตัวประชาชน"
                    onChange={onSsnChange}
                    value={ssn}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={2} xs={12}>
                  <Button
                    sx={{height:'70%'}}
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
                    ค้นหา
                  </Button>
                </Grid>
              </Grid>
              </form>
            </Box>
          </Grid>
          
          <Grid item lg={6} md={6} xs={12}>
          <Box sx={{ width: '75%' }}>
            <form onSubmit={onRoomDataSubmit}>
            <Typography  color="textSecondary" gutterBottom mb={2}>
              ตรวจสอบข้อมูลผู้พักของแต่ละห้อง
            </Typography>
            <Grid container spacing={3} >
              <Grid item md={5} xs={12}>
                <TextField
                  fullWidth
                  label={'ชื่อตึก'}
                  placeholder="B1"
                  name="bname"
                  variant="outlined"
                  onChange={onRoomChange}
                  value={room.bname}
                />
              </Grid>
              <Grid item md={5} xs={12}>
                <TextField
                  fullWidth
                  label={'เลขห้อง'}
                  placeholder="205"
                  name="roomid"
                  variant="outlined"
                  onChange={onRoomChange}
                  value={room.roomid}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <Button
                  sx={{height:'100%'}}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  ค้นหา
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

export default AdminToolbar;
