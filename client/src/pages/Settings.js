import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Request from '../components/Request';

const SettingsView = () => (
  <>
    <Helmet>
      <title>แจ้งความประสงค์สุดเจ๋ง</title>
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
          <Request />
        </Box>
      </Container>
    </Box>
  </>
);

export default SettingsView;
