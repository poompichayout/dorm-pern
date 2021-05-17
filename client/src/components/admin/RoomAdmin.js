import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Divider,
  Typography,
  Grid
} from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import url from 'src/utils/developURL';

const RoomAdmin = (props) => {
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    bname: '',
    roomid: null,
    price: null
  });

  const onRoomChange = (e) => {
    setRoom({
      ...room,
      [e.target.name]: e.target.value
    });
  }

  const onRoomDataSubmit = (e) => {
    e.preventDefault();
    axios.put(url + `/api/admin/update/price`, room)
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
          
          
          <Grid item lg={6} md={6} xs={12}>
          <Box sx={{ width: '100%' }}>
            <form onSubmit={onRoomDataSubmit}>
            <Typography  color="textSecondary" gutterBottom mb={2}>
              ปรับราคาห้องพัก
            </Typography>
            <Grid container spacing={3} >
              <Grid item md={3} xs={12}>
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
              <Grid item md={3} xs={12}>
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
              <Grid item md={3} xs={12}>
                <TextField
                  fullWidth
                  label={'ราคาห้องใหม่'}
                  placeholder="15000"
                  name="price"
                  variant="outlined"
                  onChange={onRoomChange}
                  value={room.price}
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <Button
                  sx={{height:'100%'}}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  ปรับราคา
                </Button>
              </Grid>
            </Grid>
            </form>
          </Box>
          <Divider orientation="vertical" flexItem />
            
          </Grid>





          

          
          </Grid>
        </CardContent>
      </Card>
    </Box>
  </Box>
)};

export default RoomAdmin;
