import { Button, Typography, Grid } from '@mui/material';
import banner from '../../../assets/images/banner.png';

const Banner = () => {
  return (
    <section id="banner">
        <div style={{ height: 72 }}></div>
      <Grid container className="" sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, backgroundColor: '#4E3AB0' }}>
        <Grid item xs={12} sm={6}>
          <div>
            <img src={banner} alt="Banner" style={{ width: '-webkit-fill-available' }} />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ backgroundColor: '#4E3AB0', alignSelf: 'center', padding: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', color: '#fff', width: '-webkit-fill-available' }}>
            <Typography variant="h4" sx={{ fontSize: '1rem', fontWeight: 'normal', fontFamily: 'Roboto', color: 'white' }}>
              Busy in stuff
            </Typography>
            <div style={{ height: 8 }}></div>
            <Typography variant="h1" sx={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'Roboto', color: 'white' }}>
              Virtual health care
            </Typography>

            <div style={{ height: 24 }}></div>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'normal', fontFamily: 'Roboto', color: 'white' }}>
              All medicore services are available in web and mobile app versions with fast service responses
            </Typography>

            <div style={{ height: 12 }}></div>
            <Button variant='contained' sx={{width:'150px' ,backgroundColor: 'white', color: '#4E3AB0', ":hover":{backgroundColor: '#ffeeff'} }}>
                <Typography sx={{fontFamily:'Roboto', fontWeight:'bold'}}> START CHAT </Typography>
                </Button>
          </div>
        </Grid>
      </Grid>
    </section>
  );
};

export default Banner;
