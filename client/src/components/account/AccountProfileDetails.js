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

const states = [
  {
    value: 'M',
    label: 'ชาย'
  },
  {
    value: 'F',
    label: 'หญิง'
  },
  {
    value: 'O',
    label: 'ไม่ระบุ'
  }
];

const AccountProfileDetails = (props) => {
  const user = props.user;
  const [values, setValues] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    phone: user.phoneNumber? user.phoneNumber:null,
    gender: user.sex
  });

  

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(user);

    axios.put(url() + `/api/user/update/account/${user.ssn}`, {
      params: {...values}
    }).then( res => {
      alert(res.data.message);
      localStorage.setItem('user', JSON.stringify({
        ...user,
        firstname: values.firstname,
        lastname: values.lastname,
        sex: values.gender,
        phoneNumber: values.phone
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
          subheader="สามารถแก้ไขข้อมูลพื้นฐานได้ที่นี่"
          title="ข้อมูลส่วนตัว"
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
                helperText="ระบุชื่อจริง"
                label="ชื่อจริง"
                name="firstname"
                onChange={handleChange}
                required
                value={values.firstname}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="นามสกุล"
                name="lastname"
                onChange={handleChange}
                required
                value={values.lastname}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="เบอร์โทรศัพท์"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="เพศ"
                name="gender"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.gender}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
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
          >
            บันทึกข้อมูล
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
