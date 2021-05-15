import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
} from '@material-ui/core';
import AdminToolbar from 'src/components/admin/AdminToolbar';
import AddBill from 'src/components/admin/AddBill';
import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import RoomAdmin from 'src/components/admin/RoomAdmin';

const AdminPage = () => {
  const { state } = useLocation();
  const [contract, setContract] = useState([]);
  const [people, setPeople] = useState([]);

  useEffect(() => {
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
        <Box sx={{ pt: 3 }}>
            {
              people.map((person, index) => {
                  return person.firstname
              })
            }
        </Box>
      </Container>

      <Container maxWidth={false}>
        <AddBill />
      </Container>

      <Container maxWidth={false}>
        <RoomAdmin />
      </Container>
    </Box>

    
  </>
)};

export default AdminPage;
