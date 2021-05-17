import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import RoomListResults from 'src/components/customer/RoomListResults';
// import customers2 from 'src/__mocks__/customers';
import {useState, useEffect } from 'react';
import axios from 'axios';
import url from 'src/utils/developURL';

const RoomList = () => {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get(url() + '/api/admin/room_all')
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
        <title>ข้อมูลห้องพัก</title>
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
