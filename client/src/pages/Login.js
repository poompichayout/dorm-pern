import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';

const Login = () => {
  const navigate = useNavigate();
  const form = useRef(null);
  const [username, setUsername] = useState('6109680001');
  const [password, setPassword] = useState('1234567891001');

  const submit = (e) => {
    e.preventDefault();
    const userInfo = {
      username,
      password
    }

    axios.post('http://localhost:8080/api/auth/login', userInfo)
    .then(res => {
      console.log(res.data.message);
      console.log(res.data.userInfo);
    })
    .catch(err => {
      console.error(err.message);
    })
  }

  const onChangeUsername = (value) => {
      setUsername(value);
      console.log(value);
  }

  const onChangePassword = (value) => {
    setPassword(value);
    console.log(value);
}

  return (
    <>
      <Helmet>
        <title>เข้าสู่ระบบสุดเจ๋ง</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required('Username is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={() => {
              //navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              isSubmitting,
              touched
            }) => (
              <form ref={form} onSubmit={submit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    เข้าสู่ระบบ
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={e => onChangeUsername(e.target.value)}
                  type="text"
                  value={username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={e => onChangePassword(e.target.value)}
                  type="password"
                  value={password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    เข้าสู่ระบบ
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  ยังไม่มีบัญชีใช่หรือไม่?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    สมัครสมาชิก
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
