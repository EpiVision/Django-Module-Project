// material-ui
import { Typography } from '@mui/material';
import Table from 'views/utilities/table.js'
// project imports
import MainCard from 'ui-component/cards/MainCard';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
// ==============================|| SAMPLE PAGE ||============================== //
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const PatientProfilePage = () => (
  <>
  <br></br> 

  <MainCard title="My Profile">
    {/* <Typography variant="body2">Stream Page</Typography> */}
       <br></br>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
       <Grid
  container
  direction="column"
  justifyContent="space-around"
  alignItems="center"
>
          <Item> <Avatar alt="Remy Sharp" src="https://www.w3schools.com/howto/img_avatar.png"  sx={{ width: 65, height: 65 }}/></Item> 
           <Item>
            <b  >Ali Tariq</b>
            </Item>
           <Item>
            Edit Info
            </Item>
        </Grid>
        <Grid item xs>
         
        </Grid>
      </Grid>
    </Box>

  </MainCard>
<br></br>  
  <MainCard title="Personal Information">
    {/* <Typography variant="body2">Stream Page</Typography> */}
     <Grid
  container
  direction="row"
  justifyContent="space-evenly"
  alignItems="center"
>
  <Item>Name</Item>
  <Item>Email</Item>
  <Item>Age</Item>


</Grid>
     <Grid
  container
  direction="row"
  justifyContent="space-evenly"
  alignItems="center"
>
  <Item>Gender</Item>
  <Item>Phone Number</Item>
  <Item>Height</Item>


</Grid>

  </MainCard>
<br></br>  
  <MainCard title="Address">
    {/* <Typography variant="body2">Stream Page</Typography> */}
      <Grid
  container
  direction="row"
  justifyContent="space-evenly"
  alignItems="center"
>
  <Item>Country</Item>
  <Item>City</Item>
  <Item>State</Item>


</Grid>

  </MainCard>
<br></br>  
</>
);

export default PatientProfilePage;
