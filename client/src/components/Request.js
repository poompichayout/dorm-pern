import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

const Request = (props) => {
  const [detail, setDetail] = useState('');

  const handleChange = (event) => {
    setDetail(event.target.value)
  };

  var user = localStorage.getItem('user');
  try {
    user = JSON.parse(user);
  } catch(err) {
    console.error(err.message);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: uuid(),
      ssn: user.ssn,
      detail: detail
    }
    axios.post('http://localhost:8080/api/user/request', data)
    .then(res => {
      alert(res.data.message);
    })
    .catch(err => console.error(err.message));

    setDetail('');
  }

  return (
    <form {...props} onSubmit={onSubmit}>
      <Card>
        <CardHeader
          subheader="พิมพ์เรื่องที่ท่านต้องการแจ้งให้ทางเราทราบ"
          title="แจ้งความประสงค์"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="ข้อความ"
            margin="normal"
            name="detail"
            onChange={handleChange}
            type="text"
            value={detail}
            variant="outlined"
          />
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
            ส่งเรื่อง
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default Request;
