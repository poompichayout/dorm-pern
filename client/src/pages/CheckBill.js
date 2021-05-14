import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import BillCard from 'src/components/card/BillCard';
const CheckBill = (props) => (

  <>
    <Helmet>
      <title>หน้าตรวจสอบค่าใช้จ่ายสุดเจ๋ง</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ pt: 3 }}>
          <BillCard />
        </Box>
      </Container>
    </Box>
  </>
);

export default CheckBill;
  