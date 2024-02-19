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
import { CustomizedSnackbars } from 'ui-component/Snackbar';
import { baseURL } from 'utils/constants';
import { Box } from '@mui/system';
import { useNavigate} from "react-router-dom"

const initialValues = {
  deviceName: '',
  paircode: '',
  patientId: ''
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

    initialValues.deviceName = device.deviceName;
    initialValues.paircode = device.paircode;
    initialValues.patientId = device.patientId;
    console.log(initialValues);
  }, []);

  const videoRef = useRef();
  const [isReady, setReady] = useState(false);
  const [snackbar, setSnackbar] = useState({ text: '', severity: '', open: false, handleClose: null });

  const handleSubmit = (values) => {
    fetch(baseURL + '/alarmDevice/', {
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
              text: 'Device details are updated!',
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
  // useEffect(() => {
  //   if (startStream) {
  //     setReady(true);
  //     navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  //       videoRef.current.srcObject = stream;
  //     });
  //     console.log('values1', videoRef.current, videoRef.current);
  //   } else {
  //     console.log('values2', videoRef.current, videoRef.current);
  //     if (videoRef.current != null) {
  //       videoRef.current.srcObject.getTracks().forEach((track) => {
  //         if (track.readyState == 'live' && track.kind === 'video') {
  //           track.stop();
  //         }
  //       });
  //       setReady(false);
  //     }
  //   }
  // }, [startStream]);

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  });

  return (
    <MainCard title="Edit Alarm Device">
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
                  label="Device Name"
                  variant="outlined"
                  fullWidth
                  id="deviceName"
                  name="deviceName"
                  value={formik.values.deviceName}
                  onChange={formik.handleChange}
                  disabled={alertButton}
                  required
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  label="Pair Code"
                  variant="outlined"
                  fullWidth
                  id="paircode"
                  name="paircode"
                  value={formik.values.paircode}
                  onChange={formik.handleChange}
                  required
                  disabled={alertButton}
                />
              </Grid>
              
              <Grid item sm={12}>
                <TextField
                  label="Patient Id"
                  variant="outlined"
                  fullWidth
                  id="patientId"
                  name="patientId"
                  value={formik.values.patientId}
                  onChange={formik.handleChange}
                  disabled={alertButton}
                  required
                />
              </Grid>
            </Grid>
            <Grid container direction={'column'} sm={6} alignItems={'center'} justifyContent={'center'}>
              
            </Grid>
          </Grid>
          
        </Grid>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container justifyContent={'space-between'} direction={'row'} marginTop={3}>
          <Grid item >
            
              <Button type="submit" variant="contained" color="secondary">
                Save
              </Button>
            

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
                window.location.href = '/Alarm-Devices';
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
