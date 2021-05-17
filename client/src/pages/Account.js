import { Helmet } from 'react-helmet';
import { useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Divider
} from '@material-ui/core';
import axios from 'axios';
import url from 'src/utils/developURL';
import AccountProfileDetails from 'src/components/account/AccountProfileDetails';
import BookRoom from 'src/components/account/BookRoom';
import UpdateRoom from 'src/components/account/UpdateRoom';
import ContractView from 'src/components/account/ContractView';

const Account = () => {
  var user = localStorage.getItem('user');
  let address = JSON.parse(localStorage.getItem('address'));
  try {
    user = JSON.parse(user);
  } catch(err) {
    console.error(err.message);
  }

  useEffect(() => {
    if(address == null) {
      axios.get(url() + `/api/user/address?ssn=${user.ssn}`)
      .then(res => {
        localStorage.setItem('address', JSON.stringify(res.data));
      })
    }
  }, []);
  
  return (
  <>
    <Helmet>
      <title>ข้อมูลส่วนตัวสุดเจ๋ง</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid  container spacing={3} mb={2}>
          <Grid item lg={4} md={6} xs={12}>
          <ContractView user={user} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <AccountProfileDetails user={user}/>
          </Grid>
        </Grid>
        <Divider/>
        { /* container ตัวล่าง */ }
        <Grid container spacing={3} mt={1}>
          { /* component ฝั่งซ้าย */ }
          <Grid item lg={4} md={6} xs={12}>
            
          </Grid>

          { /* component ฝั่งขวา */ }
          <Grid item lg={8} md={6} xs={12}> 
            { /* หน้าจอง */ }
            <Grid item lg={12} md={12} xs={12}>
              <BookRoom user={user} />
            </Grid>
            { /* หน้าอัพเดต */ }
            <Grid item lg={12} md={12} xs={12} mt={1}>
              <UpdateRoom user={user} />
            </Grid>
          </Grid>
          
        </Grid>
      </Container>
    </Box>
  </>
)};

export default Account;
