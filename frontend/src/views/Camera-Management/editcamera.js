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
import Arrow_forward from '@mui/icons-material/ArrowForward';
import MainCard from 'ui-component/cards/MainCard';
import { CustomizedSnackbars, SuccessSnackBar } from 'ui-component/Snackbar';
import { baseURL } from 'utils/constants';
import { Box } from '@mui/system';
import { useNavigate} from "react-router-dom"

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
  let navigate = useNavigate();
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

  const videoRef = useRef();
  const [isReady, setReady] = useState(false);
  const [snackbar, setSnackbar] = useState({ text: '', severity: '', open: false, handleClose: null });

  const handleSubmit = (values) => {
    fetch(baseURL + '/device/', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token ' + localStorage.getItem('token')
      },
      body: JSON.stringify(values)
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          // check if data is not null
          if (data != null) {
            console.log(data);
            localStorage.setItem('selected', JSON.stringify(data));
            setSnackbar({
              text: 'Device details are updated! Please test stream to confirm the changes',
              severity: 'success',
              open: true
            });
          }
        });
      } else if (response.status === 401) {
        setSnackbar({
          text: 'You are not Unauthorized for this operation!',
          severity: 'warning',
          open: true
        });
      }
      else if (response.status === 400) {
        alert('You are not Unauthorized for this operation!');
        response.json().then((data) => {
          // check if data is not null
          if (data != null) {
            setSnackbar({
              text: data.message,
              severity: 'error',
              open: true
            });
          }
        });
      } else {
        response.json().then((data) => {
          if (data != null) {
            setSnackbar({
              text: data.message,
              severity: 'error',
              open: true
            });
          } else {
            setSnackbar({
              text: 'Device details are not updated! Please try again',
              severity: 'error',
              open: true
            });
          }
        });
      }
    });

    setAlertButton(true);
  };

  const [startStream, setStartStream] = useState(false);
  function handleTestStream() {
    setStartStream(!startStream);
  }
  useEffect(() => {
    if (startStream) {
      setReady(true);
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoRef.current.srcObject = stream;
      });
      console.log('values1', videoRef.current, videoRef.current);
    } else {
      console.log('values2', videoRef.current, videoRef.current);
      if (videoRef.current != null) {
        videoRef.current.srcObject.getTracks().forEach((track) => {
          if (track.readyState == 'live' && track.kind === 'video') {
            track.stop();
          }
        });
        setReady(false);
      }
    }
  }, [startStream]);

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  });

  return (
    <MainCard title="Edit Camera">
      <CustomizedSnackbars
        autoHideDuration={3000}
        text={snackbar.text}
        severity={snackbar.severity}
        open={snackbar.open}
        handleClose={() => {
          setSnackbar({ open: false });
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
                {!startStream ? (
                  <Button fullWidth variant="contained" color="secondary" onClick={handleTestStream}>
                    Test Stream
                  </Button>
                ) : (
                  <Button fullWidth variant="contained" color="secondary" onClick={handleTestStream}>
                    Stop Stream
                  </Button>
                )}
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
        <Box sx={{ flexGrow: 1 }}>
        <Grid container justifyContent={'space-between'} direction={'row'} marginTop={3}>
          <Grid item >
            {!alertButton ? (
              <Button type="submit" variant="contained" color="secondary">
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setSnackbar({
                    text: 'Please test stream to confirm the changes!',
                    severity: 'info',
                    open: true
                  });
                }}
              >
                Saved
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
          <Grid item >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                window.location.href = '/Camera-Management';
              }}
              endIcon={<Arrow_forward />}
              disabled={!alertButton}
            >
              <Typography variant="button"> Continue </Typography>
            </Button>
          </Grid>
        </Grid>
        </Box>
      </form>
    </MainCard>
  );
};

export default EditCamera;
