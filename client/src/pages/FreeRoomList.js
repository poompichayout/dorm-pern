import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import RoomListResults from 'src/components/customer/RoomListResults';
import {useState, useEffect } from 'react';
import axios from 'axios';

const RoomList = () => {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/admin/getallroom/true')
      .then(res => res.data)
      .then(data => {
        console.log(data)
        setCustomers(data)
      })
      .catch(err => console.error(err));
  }, [])

  return (
    <>
      <Helmet>
        <title>ข้อมูลห้องพักว่าง</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          {/*<CustomerListToolbar />*/}
          <Box sx={{ pt: 3 }}>
            <RoomListResults customers={customers} />
          </Box>
        </Container>
      </Box>
    </>
  );
} 

export default RoomList;
