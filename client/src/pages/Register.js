import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import url from 'src/utils/developURL';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  MenuItem,
} from '@material-ui/core';

const Register = () => {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    gender: 'M',
    type: 'student'
  })

  const onChange = (name, value) => {
    setRegisterForm({...registerForm, [name]: value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(registerForm);
    axios.post(url + '/api/auth/register', registerForm)
    .then(res => {
      alert(res.data.message);
      navigate('/login', { replace: true });
    })
    .catch(err => {
      console.error(err.message);
    })
  };

  return (
    <>
      <Helmet>
        <title>สมัครสมาชิกสุดเจ๋ง</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: 'auto',
          justifyContent: 'center',
          pb: '50px'
        }}
      >
        <Container maxWidth="sm" >
          <Formik
            initialValues={{
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                username: Yup.number().required('username is required'),
                firstName: Yup.string().max(255).required('First name is required'),
                lastName: Yup.string().max(255).required('Last name is required'),
                password: Yup.string().min(13).max(13).required('password is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
            onSubmit={() => {
              navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={onSubmit}>
                <Box sx={{ mb: '10px', mt: 3 }}>
                  <Typography color="textPrimary"  variant="h2">
                    สมัครสมาชิกใหม่
                  </Typography>
                  <Typography color="textSecondary" gutterBottom variant="body2" margin='normal'>
                    ใช้รหัสนักศึกษาหรือรหัสพนักงานเป็น username<br/>
                    และรหัสประจำตัวประชาชนเป็น password<br/>
                    สามารถระบุเป็นภาษาไทยได้
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
                  onChange={e => onChange('username',e.target.value)}
                  value={registerForm.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="First name"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={e => onChange('firstname',e.target.value)}
                  value={registerForm.firstname}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Last name"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={e => onChange('lastname',e.target.value)}
                  value={registerForm.lastname}
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
                  onChange={e => onChange('password',e.target.value)}
                  type="password"
                  value={registerForm.password}
                  variant="outlined"
                />
                <TextField id="select" label="gender" value={registerForm.gender} select onChange={e => onChange('gender',e.target.value)}
                margin="normal" fullWidth>
                  <MenuItem value="M">ชาย</MenuItem>
                  <MenuItem value="F">หญิง</MenuItem>
                  <MenuItem value="O">ไม่ระบุ</MenuItem>
                </TextField>
                <TextField id="select" label="type" value={registerForm.type} select onChange={e => onChange('type',e.target.value)} 
                margin="normal" fullWidth>
                  <MenuItem value="student">นักเรียน</MenuItem>
                  <MenuItem value="staff">พนักงาน</MenuItem>
                </TextField>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                >
                  <Checkbox checked={values.policy} name="policy" onChange={handleChange} />
                  <Typography color="textSecondary" variant="body1" >
                    ฉันยอมรับ
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      เงื่อนไขและข้อตกลง
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    สมัครสมาชิก
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  มีบัญชีอยู่แล้ว?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    เข้าสู่ระบบ
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

export default Register;
