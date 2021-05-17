import { Helmet } from 'react-helmet';
import { Box, Container, Typography } from '@material-ui/core';
import RoomListResults from 'src/components/customer/RoomListResults';
import {useState, useEffect } from 'react';
import axios from 'axios';
import url from 'src/utils/developURL';

const RoomList = () => {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get(url() + '/api/admin/room?status=true')
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
            <Typography color="textSecondary" gutterBottom variant="h5" align="left" mb={2}>
              {`จำนวนห้องว่าง ${customers.length} ห้อง`}
            </Typography>
            <RoomListResults customers={customers} />
          </Box>
        </Container>
      </Box>
    </>
  );
} 

export default RoomList;
