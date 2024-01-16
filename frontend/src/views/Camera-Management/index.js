// material-ui
import { Typography } from '@mui/material';
import Table from 'views/utilities/table.js';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import CameraTable from './cameraTable.js';
import Fab from '@mui/material/Fab';
// ==============================|| SAMPLE PAGE ||============================== //
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const CamerManagmentPage = () => {
  if (localStorage.getItem('user') === null) {
    window.location.href = '/login';
  } else {
  //   window.location.href = '/dashboard';
  }
  return (
    <>
      <MainCard title="Camera Management" secondary="Add device" secondaryPath="/Camera-Management/addcamera/">
        <CameraTable />
      </MainCard>
    </>
  );
};

export default CamerManagmentPage;
