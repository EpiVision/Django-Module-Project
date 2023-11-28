import React, { useRef, useEffect, useState } from 'react';

import { useFormik } from 'formik';
import {
  TextField,
  Button,
  Container,
  Grid,
  Card,
  Typography,
  FormControl,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  IconButton
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MainCard from 'ui-component/cards/MainCard';
import { CustomizedSnackbars, SuccessSnackBar } from 'ui-component/Snackbar';
import { baseURL } from 'utils/constants';
import { useCookies } from 'react-cookie';
import { set } from 'immutable';
import { auto } from '@popperjs/core';
import { func } from 'prop-types';

const initialValues = {
  companyName: '',
  userName: '',
  password: '',
  ipAddress: '',
  rtspPort: '',
  channel: '',
  deviceId: ''
};

const EditCamera = () => {
  const [cookies, setCookie] = useCookies(['patient']);
  const [open, setOpen] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [alertButton, setAlertButton] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    const device = JSON.parse(localStorage.getItem('selected'));
    
    initialValues.companyName = device.companyname;
    initialValues.userName = device.username;
    initialValues.password = device.password;
    initialValues.ipAddress = device.ipaddress;
    initialValues.rtspPort = device.rtspport;
    initialValues.channel = device.channel;
    initialValues.deviceId = device.deviceid;
    console.log(initialValues);
  }, []);

  // const handleClose = () => {
  //   setOpen(false);
  // };
  function handleClose(setOpen) {
    setOpen(false);
  }

  const videoRef = useRef();
  const [isReady, setReady] = useState(false);
  function setRef() {
    setReady(true);
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
    });
  }

  const handleSubmit = (values) => {
    fetch(baseURL + '/device/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token ' + localStorage.getItem('token')
      },
      body: JSON.stringify(values)
    }).then((response) => {
      if (response.status === 201) {
        response.json().then((data) => {
          console.log(data);
          // window.location.replace('/login/');
          // if (data.status === 'success') {
          //   // localStorage.setItem('token', data.token);
          // }
        });
      } else if (response.status === 401) {
        alert('You are not Unauthorized for this operation!');
        response.json().then((data) => {
          console.log(data);
          alert(data.message);
        });
      }
    });

    // setReady(true);
    // setRef();
    setOpen(true);
    setAlertButton(true);
    console.log('Form submitted with values:', values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  });

  return (
    <MainCard title="Edit Camera">
      <CustomizedSnackbars
        text={'Device info is saved. Test stream to register device.'}
        severity="info"
        open={open}
        handleClose={() => {
          handleClose(setOpen);
        }}
      />
      <CustomizedSnackbars
        text={'Please test stream to confirm camera registeration!'}
        severity="warning"
        open={openWarning}
        handleClose={() => {
          handleClose(setOpenWarning);
        }}
      />
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid container direction="row" alignItems={'space-evenly'} marginLeft={1} marginTop={2} justifyContent={'space-evenly'}>
            <Grid container direction={'row'} spacing={2} sm={6} alignItems={'space-evenly'} justifyContent={'space-evenly'}>
              <br></br>
              <Grid item sm={12}>
                <TextField
                  label="Company Name"
                  variant="outlined"
                  fullWidth
                  id="companyName"
                  name="companyName"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  disabled={alertButton}
                  required
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  label="User Name"
                  variant="outlined"
                  fullWidth
                  id="userName"
                  name="userName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  required
                  disabled={alertButton}
                />
              </Grid>
              <Grid item sm={12}>
                <FormControl sx={{ width: '100%', required: true }} variant="outlined" disabled={alertButton} required>
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
              <Grid item sm={12}>
                <TextField
                  label="IP Address"
                  variant="outlined"
                  fullWidth
                  id="ipAddress"
                  name="ipAddress"
                  value={formik.values.ipAddress}
                  onChange={formik.handleChange}
                  disabled={alertButton}
                  required
                />
              </Grid>
            </Grid>
            <Grid container direction={'column'} sm={6} alignItems={'center'} justifyContent={'center'}>
              <Card
                variant="outlined"
                sx={{
                  width: window.screen.availWidth * 0.3,
                  height: '310px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'grey.300'
                }}
              >
                <Grid item textAlign={'center'}>
                  {isReady ? (
                    <video ref={videoRef} controls width="100%" height="auto" />
                  ) : (
                    <Typography variant="h3" color={'grey.500'}>
                      No Source
                    </Typography>
                  )}
                </Grid>
              </Card>

              <div style={{ width: window.screen.availWidth * 0.3, marginTop: 5 }}>
                <Button fullWidth variant="contained" color="secondary" onClick={setRef}>
                  Test Stream
                </Button>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="RTSP Port"
              variant="outlined"
              fullWidth
              id="rtspPort"
              name="rtspPort"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              value={formik.values.rtspPort}
              onChange={formik.handleChange}
              disabled={alertButton}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Channel"
              variant="outlined"
              fullWidth
              id="channel"
              name="channel"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              value={formik.values.channel}
              onChange={formik.handleChange}
              disabled={alertButton}
              required
            />
          </Grid>
        </Grid>
        <Grid marginTop={3}>
          {!alertButton ? (
            <Button type="submit" variant="contained" color="secondary">
              Save
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setOpenWarning(true);
              }}
            >
              Save
            </Button>
          )}
          {'  '}

          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setAlertButton(false);
            }}
          >
            <Typography variant="button"> Edit</Typography>
          </Button>
        </Grid>
      </form>
    </MainCard>
  );
};

export default EditCamera;
