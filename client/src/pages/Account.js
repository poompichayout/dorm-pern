import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountProfile from 'src/components/account/AccountProfile';
import AccountProfileDetails from 'src/components/account/AccountProfileDetails';
import BookRoom from 'src/components/account/BookRoom';
import UpdateRoom from 'src/components/account/UpdateRoom';
import ContractView from 'src/components/account/ContractView';

const Account = () => {
  
  var user = localStorage.getItem('user');
  try {
    user = JSON.parse(user);
  } catch(err) {
    console.error(err.message);
  }
  
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
        <Grid  container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
          <ContractView user={user} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <AccountProfileDetails user={user} />
          </Grid>
        </Grid>
        { /* container ตัวล่าง */ }
        <Grid container spacing={3} mt={3}>
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
            <Grid item lg={12} md={12} xs={12} mt={3}>
              <UpdateRoom user={user} />
            </Grid>
          </Grid>
          
        </Grid>
      </Container>
    </Box>
  </>
)};

export default Account;
