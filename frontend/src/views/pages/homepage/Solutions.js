// import React from 'react'
import { Typography, Grid } from '@mui/material';
import arrows from '../../../assets/images/arrows.svg';
import sol1 from '../../../assets/images/sol-1.png';
import sol2 from '../../../assets/images/sol-2.png';
import sol3 from '../../../assets/images/sol-3.png';
import sol4 from '../../../assets/images/sol-4.svg';
import BasicCard from 'ui-component/cards/HomeCard';
import {SolutionCard} from 'ui-component/cards/HomeCard';

const Solutions = () => {
  return (
    <>
      <Typography variant="h5" sx={{ fontFamily: 'Roboto', fontWeight: 'medium', textAlign: 'center', color: '#4E3AB0' }}>
        Hassel free solution
      </Typography>

      <Typography variant="h1" sx={{ fontFamily: 'Roboto', fontWeight: 'bold', textAlign: 'center' }}>
        Easy steps for your solution
      </Typography>

      <Grid container direction="row" justifyContent='center' sx={{ gap: '12px', marginTop:'24px'}}>
        <SolutionCard title = "Choose a Pricing Plan" description= "Cost-effective plans to make it ease for you" image={sol1}/>
        <SolutionCard title = "Setup Your Profile" description= "Complete your profile to make it go and working" image={sol2}/>
        <SolutionCard title = "Camera Configuration" description= "Setup cameras and configure them into system" image={sol3}/>
        <SolutionCard title = "Face Registration" description= "Registration of patient’s face  needed for prediction" image={sol4}/>
      </Grid>
    </>
  );
};
export default Solutions;
