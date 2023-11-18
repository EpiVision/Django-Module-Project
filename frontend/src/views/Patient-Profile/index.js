// material-ui
import {
  Typography,
  Button,
  TextField,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  InputLabel,
  IconButton
} from '@mui/material';
import Table from 'views/utilities/table.js';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import { baseURL } from 'utils/constants';
import { get } from 'immutable';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { MuiTelInput } from 'mui-tel-input';
// ==============================|| SAMPLE PAGE ||============================== //
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const PatientProfilePage = () => {
  const [patient, setPatient] = useState({
    id: -1,
    fullname: 'dummy',
    age: 0,
    contact: '03xxxxxxxxx',
    gender: null,
    weight: null,
    userid: -1
  });
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  function getPatientInfo() {
    fetch(baseURL + '/profile/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token ' + localStorage.getItem('token')
      }
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          console.log(data);
          setPatient(data);
        });
      } else {
        response.json().then((data) => {
          alert(data);
        });
      }
    });
  }

  React.useEffect(() => {
    getPatientInfo();
  }, []); // getPatientInfo

  const [showPassword, setShowPassword] = React.useState(false);
  const [phone, setPhone] = useState('+92');

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validationSchema = yup.object({
    email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
    password: yup.string('Enter your password').min(8, 'Password should be of minimum 8 characters length').required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar'
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <>
      {/* <br></br> */}

      <MainCard title="Profile">
        {/* <Typography variant="body2">Stream Page</Typography> */}
        <br></br>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid container direction="column" alignItems="center">
              <Item>
                {' '}
                <Avatar alt="Remy Sharp" src="https://www.w3schools.com/howto/img_avatar.png" sx={{ width: 150, height: 150 }} />
              </Item>
              <Item>
                <Typography variant="h4">{patient.fullname}</Typography>
                {/* <Item>{user.email}</Item> */}
              </Item>
              <Item>
                <Button size="large" type="submit" variant="outlined" color="secondary" className="">
                  <Typography variant="button">Upload Avatar</Typography>
                </Button>
              </Item>
            </Grid>
            {/* <Grid item xs></Grid> */}
          </Grid>
        </Box>
      </MainCard>
      <br></br>
      <MainCard title="Edit Details">
        <br></br>
        <form onSubmit={formik.handleSubmit}>
          <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
            <Grid container marginBottom={3} direction="row" justifyContent="space-evenly" alignItems="center">
              <Grid item xs="12" sm={5}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs="12" sm={5}>
                <FormControl sx={{ width: '100%' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container marginBottom={3} direction="row" justifyContent="space-evenly" alignItems="center">
              <Grid item xs="12" sm={5}>
                <TextField
                  label="Weight"
                  id="outlined-start-adornment"
                  aria-describedby="outlined-weight-helper-text"
                  sx={{ width: '100%' }}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                  }}
                />
                <FormHelperText id="outlined-weight-helper-text"><Typography variant='caption'>Required in kg</Typography></FormHelperText>
              </Grid>
              <Grid item xs="12" sm={5}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>

            <Grid container marginBottom={3} direction="row" justifyContent="space-evenly" alignItems="center">
              <Grid item xs="12" sm={5}>
              <MuiTelInput fullWidth value={phone} onChange={handlePhoneChange} />
              </Grid>
              <Grid item xs="12" sm={5}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>

            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
        </form>
      </MainCard>
      {/* <br></br> */}
      {/* <MainCard title="Address"> */}
      {/* <Typography variant="body2">Stream Page</Typography> */}
      {/* <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
        <Item>Country</Item>
        <Item>City</Item>
        <Item>State</Item>
      </Grid> */}
      {/* </MainCard> */}
      <br></br>
    </>
  );
};

export default PatientProfilePage;
