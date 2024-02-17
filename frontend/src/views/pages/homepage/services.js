import React from 'react';
import { Typography, Grid } from '@mui/material';
import arrows from '../../../assets/images/arrows.svg';
import sol1 from '../../../assets/images/sol-1.png';
import sol2 from '../../../assets/images/sol-2.png';
import sol3 from '../../../assets/images/sol-3.png';
import sol4 from '../../../assets/images/sol-4.svg';
import ser1 from '../../../assets/images/ser-1.png';
import ser2 from '../../../assets/images/ser-2.png';
import ser3 from '../../../assets/images/ser-3.png';
import ser4 from '../../../assets/images/ser-4.png';
import { ServiceCard } from 'ui-component/cards/HomeCard';

const Services = () => {
  return (
    <>
        <div style={{height:'72px'}}></div>
      <Typography variant="h5" sx={{ fontFamily: 'Roboto', fontWeight: 'medium', textAlign: 'center', color: '#4E3AB0' }}>
        Hassel free solution
      </Typography>

      <Typography variant="h1" sx={{ fontFamily: 'Roboto', fontWeight: 'bold', textAlign: 'center' }}>
      Our Services
      </Typography>

      <Grid container direction="row" justifyContent='center' sx={{ gap: '12px', marginTop:'24px'}}>
        <ServiceCard title = "Seizure Prediction" description= "Cost-effective plans to make it ease for you" image={ser1} bgcolor='white'/>
        <ServiceCard title = "Seizure Forecasting" description= "Complete your profile to make it go and working" image={ser2} bgcolor='#4E3AB0' color='white'/>
        <ServiceCard title = "Alarm generation" description= "Setup cameras and configure them into system" image={ser3} bgcolor='white'/>
        <ServiceCard title = "Activity Logging" description= "Registration of patient’s face  needed for prediction" image={ser4} bgcolor='white'/>

      </Grid>
    </>
  );
};

export default Services;
