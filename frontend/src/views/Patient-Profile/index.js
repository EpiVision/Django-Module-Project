// material-ui
import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  MenuItem
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import { baseURL } from 'utils/constants';
import { useFormik } from 'formik';

import { MuiTelInput } from 'mui-tel-input';
import { CustomizedSnackbars } from 'ui-component/Snackbar';
import useCookies from 'hooks/useCookies';
// ==============================|| SAMPLE PAGE ||============================== //
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const initialValues= {
  weight: '',
  age: '',
  contact: '',
  gender: ''
};
const PatientProfilePage = () => {
  if (localStorage.getItem('user') === null) {
    window.location.href = '/login';
  } 
  
  const [patient, setPatient] = useState({
    id: -1,
    fullname: 'dummy',
    age: 0,
    contact: '03123456789',
    gender: 0,
    weight: 0,
    userid: -1
  });
  const [cookies, setCookie] = useCookies(['patient']);
  const [snackbar, setSnackbar] = useState({ text: '', severity: '', open: false, handleClose: null });

  React.useEffect(() => {
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
          initialValues.weight = data['weight'];
          initialValues.age = data['age'];
          initialValues.contact = data['contact'];
          initialValues.gender = data['gender'];
          setPatient(data);
          setCookie('patient', JSON.stringify(data));
        });
      } else {
        response.json().then((data) => {
          alert(data);
        });
      }
    });
  }, []); 

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


  const formik = useFormik({
    initialValues,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      fetch(baseURL + '/updatePatient/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Token ' + localStorage.getItem('token')
        },
        body: JSON.stringify(values)
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            setSnackbar({
              text: data.message,
              severity: 'success',
              open: true
            });
          });
        } else {
          response.json().then((data) => {
            setSnackbar({
              text: data.message,
              severity: 'warning',
              open: true
            });
          });
        }
      });
    }
  });

  return (
    <>
      {/* <br></br> */}
      <CustomizedSnackbars
        autoHideDuration={3000}
        text={snackbar.text}
        severity={snackbar.severity}
        open={snackbar.open}
        handleClose={() => {
          setSnackbar({ open: false });
        }}
      />
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
            {/* <Grid container marginBottom={3} direction="row" justifyContent="space-evenly" alignItems="center">
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
            </Grid> */}

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
