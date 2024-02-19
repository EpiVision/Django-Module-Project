// material-ui
import { Typography } from '@mui/material';
import Table from 'views/utilities/table.js';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import DeviceTable from './deviceTable.js';
import Fab from '@mui/material/Fab';
import { CustomizedSnackbars } from 'ui-component/Snackbar';
import { useState } from 'react';
import { baseURL } from 'utils/constants';

// ==============================|| SAMPLE PAGE ||============================== //
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const AlarmManagmentPage = () => {
  const [snackbar, setSnackbar] = useState({ text: '', severity: '', open: false, handleClose: null });
  
  function raiseAlarm() {
    fetch(baseURL + '/raiseAlarm/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token ' + localStorage.getItem('token')
      },
    }).then((response) => {
      if (response.status === 201) {
        response.json().then((data) => {
          if (data != null) {
            setSnackbar({
              text: data.message,
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
      } else {
        response.json().then((data) => {
          if (data != null) {
            setSnackbar({
              text: 'Something went wrong! ' + response.status,
              severity: 'warning',
              open: true
            });
          }
        });
      }
    });

  }
  if (localStorage.getItem('user') === null) {
    window.location.href = '/login';
  } else {
  //   window.location.href = '/dashboard';
  }
  return (
    <>
    <CustomizedSnackbars
        autoHideDuration={3000}
        text={snackbar.text}
        severity={snackbar.severity}
        open={snackbar.open}
        handleClose={() => {
          setSnackbar({ open: false });
        }}
      />
      <MainCard title="Alarm Device Management" secondary="Add device" secondaryPath="/Alarm-Devices/adddevice/">
        <Button variant="contained" color="secondary" onClick={raiseAlarm}>
          Raise Alarm
        </Button>
        <DeviceTable />
      </MainCard>
    </>
  );
};

export default AlarmManagmentPage;
