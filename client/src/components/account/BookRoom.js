import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import axios from 'axios';
import url from 'src/utils/developURL';

const BookRoom = (props) => {
  const user = props.user;
  const [values, setValues] = useState({
    bname: user.bname,
    roomid: user.roomid
  });

  

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios.post(url + `/api/user/booking_room`, {
      ...values,
      ssn: user.ssn
    }).then( res => {
      alert(res.data.message);
      localStorage.setItem('user', JSON.stringify({
        ...user,
        bname: values.bname,
        roomid: values.roomid
      }))
    }).catch(err => {
      console.error(err.message);
    })
  }

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
      onSubmit={onSubmit}
    >
      <Card>
        <CardHeader
          subheader="เพิ่มข้อมูลการจองห้องพัก"
          title="จองห้องพัก"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="ระบุชื่อห้อง"
                label="ระบุตึก"
                name="bname"
                onChange={handleChange}
                required
                value={values.bname}
                variant="outlined"
                disabled={user.bname && user.roomid}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="ระบุห้อง"
                name="roomid"
                onChange={handleChange}
                required
                value={values.roomid}
                variant="outlined"
                disabled={user.bname && user.roomid}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={user.bname && user.roomid}
          >
            จองห้องพัก
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default BookRoom;
