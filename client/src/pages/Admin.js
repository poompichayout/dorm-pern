import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
} from '@material-ui/core';
import AdminToolbar from 'src/components/admin/AdminToolbar';
import AddBill from 'src/components/admin/AddBill';
import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import RoomAdmin from 'src/components/admin/RoomAdmin';
import PaymentCard from 'src/components/card/PaymentCard';
import axios from 'axios';
import url from 'src/utils/developURL';

const AdminPage = () => {
  const { state } = useLocation();
  const [contract, setContract] = useState([]);
  const [people, setPeople] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {

    axios.get(url() + '/api/admin/payment')
    .then(res => {
      setPayments(res.data);
    })
    .catch(err => console.error(err.message));

    if(state) {
      const {people , contracts} = state;
      if(people) {
        setPeople(people)
      }
      if(contracts) {
        setContract(contracts)
      }
    }
  }, []);
  
  
  
  return (
  <>
    <Helmet>
      <title>หน้าผู้จัดการสุดเจ๋ง</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <AdminToolbar />
      </Container>

      <Container maxWidth={false}>
        <AddBill />
      </Container>

      <Container maxWidth={false}>
        <RoomAdmin />
      </Container>
      
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
        <PaymentCard payments={payments} />
        </Box>
      </Container>
    </Box>

    
  </>
)};

export default AdminPage;
