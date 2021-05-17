import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { Helmet } from 'react-helmet';

const App = () => {
  const routing = useRoutes(routes);

  return ( 
    <ThemeProvider theme={theme}>
      <Helmet><title>ระบบจัดการหอพัก</title></Helmet>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
