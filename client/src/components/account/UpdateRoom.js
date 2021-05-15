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

const UpdateRoom = (props) => {
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

  const onCancelSubmit = (e) => {
    e.preventDefault();
    console.log('click');
    axios.put(`/api/user/cancel/room`, {
      bname: values.bname,
      roomid: values.roomid,
      ssn: user.ssn
    }).then( res => {
      alert(res.data.message);
      localStorage.setItem('user', JSON.stringify({
        ...user,
        bname: null,
        roomid: null
      }))
    }).catch(err => {
      console.error(err.message);
    })
  }

  const onUpdateSubmit = (e) => {
    e.preventDefault();
    const data = {
      oldbname: user.bname,
      oldroomid: user.roomid,
      newbname: values.bname,
      newroomid: values.roomid,
      ssn: user.ssn
    }

    axios.put(`/api/user/update/room`, data)
    .then( res => {
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
      onSubmit={onUpdateSubmit}
    >
      <Card>
        <CardHeader
          subheader="เปลี่ยนหรือยกเลิกห้องพัก"
          title="แก้ไขข้อมูลห้องพัก"
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
                label="ระบุตึก"
                name="bname"
                onChange={handleChange}
                required
                value={values.bname}
                variant="outlined"
                disabled={!user.bname}
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
                disabled={!user.roomid}
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
          <Box mr={3}>
          <Button
            color="secondary"
            variant="contained"
            name="cancel"
            onClick={onCancelSubmit}
            disabled={user.bname !== values.bname || user.roomid !== values.roomid || (!user.bname && !user.roomid)}
          >
            ยกเลิกห้องพัก
          </Button>
          </Box>

          <Button
            color="primary"
            variant="contained"
            type="submit"
            name="update"
            disabled={user.bname === values.bname && user.roomid === values.roomid}
          >
            เปลี่ยนห้องพัก
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default UpdateRoom;
