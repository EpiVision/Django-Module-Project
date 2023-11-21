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
  IconButton,
  MenuItem
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
import { useCookies } from 'react-cookie';
// ==============================|| SAMPLE PAGE ||============================== //
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const PatientProfilePage = () => {
  const [cookies, setCookie] = useCookies(['patient']);
  const [patient, setPatient] = useState({
    id: -1,
    fullname: 'dummy',
    age: 0,
    contact: '03123456789',
    gender: 0,
    weight: 0,
    userid: -1
  });
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  function getPatientInfo() {
    const patient = cookies.patient;
    console.log(patient);
    if (patient) {
      setPatient(patient);
      return;
    }
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
          setCookie('patient', JSON.stringify(data));
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
  }, [patient]); // getPatientInfo

  const [showPassword, setShowPassword] = React.useState(false);
  const genders = [
    {
      value: '0',
      label: 'Rather not say'
    },
    {
      value: '1',
      label: 'Male'
    },
    {
      value: '2',
      label: 'Female'
    }
  ];

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
      email: user.email,
      password: user.password,
      weight: patient.weight,
      age: patient.age,
      contact: patient.contact,
      gender: patient.gender
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('save btn');
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
                    inputProps={{
                      onChange: (e) => {
                        formik.setFieldValue('password', e.target.value);
                      },
                      onBlur: formik.handleBlur,
                      value: formik.values.password
                    }}
                    label="Password"
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container marginBottom={3} direction="row" justifyContent="space-evenly" alignItems="center">
              <Grid item xs="12" sm={5}>
                <TextField
                  label="Weight"
                  name="weight"
                  type="number"
                  id="outlined-start-adornment"
                  sx={{ width: '100%' }}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                    onChange: (e) => {
                      formik.setFieldValue('weight', e.target.value);
                    },
                    onBlur: formik.handleBlur,
                    value: formik.values.weight ? formik.values.weight : 0
                  }}
                />
              </Grid>
              <Grid item xs="12" sm={5}>
                <TextField
                  fullWidth
                  type="number"
                  required
                  id="outlined-required"
                  label="Age"
                  defaultValue="Hello World"
                  inputProps={{
                    onChange: (e) => {
                      formik.setFieldValue('age', e.target.value);
                    },
                    onBlur: formik.handleBlur,
                    value: formik.values.age
                  }}
                />
              </Grid>
            </Grid>

            <Grid container marginBottom={3} direction="row" justifyContent="space-evenly" alignItems="center">
              <Grid item xs="12" sm={5}>
                <MuiTelInput
                  fullWidth
                  inputProps={{
                    onChange: (e) => {
                      formik.setFieldValue('contact', e.target.value);
                    },
                    onBlur: formik.handleBlur,
                    value: formik.values.contact
                  }}
                  defaultCountry="pk"
                  label="Phone Number"
                />
              </Grid>
              <Grid item xs="12" sm={5}>
                <TextField
                  fullWidth
                  id="gender"
                  select
                  label="Gender"
                  defaultValue="1"
                  inputProps={{
                    onChange: (e) => {
                      formik.setFieldValue('gender', e.target.value);
                    },
                    onBlur: formik.handleBlur,
                    value: formik.values.gender ? formik.values.gender : 0
                  }}
                >
                  {genders.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid item xs="12" sm={5}>
              <Button color="secondary" variant="contained" fullWidth type="submit">
                <Typography variant="button">Save</Typography>
              </Button>
            </Grid>
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
