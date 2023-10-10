// material-ui
import { Typography } from '@mui/material';
import Table from 'views/utilities/table.js'
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
  color: theme.palette.text.secondary,
}));
const CamerManagmentPage = () => (
  <>
  <br></br>
  <MainCard title="Camera Management">
    
      <Grid
  container
  direction="row"
  justifyContent="space-evenly"
  alignItems="center">
  <Item>Gender</Item>
  <Item>Phone Number</Item>
  <Item>Height</Item>
  <Item> 

<Button variant="contained">Search  </Button>
  </Item>


</Grid>
  </MainCard>
<br></br>
  <MainCard title="Camera Management">
       <Fab variant="extended" size="small" color="primary" aria-label="add" >
        {/* <NavigationIcon sx={{ mr: 1 }} /> */}
       Add Device
      </Fab>
    
     
  <CameraTable/>
  </MainCard>
</>
);

export default CamerManagmentPage;
