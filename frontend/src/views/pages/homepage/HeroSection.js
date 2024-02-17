import bedroom from '../../../assets/images/bedroom.png';
import { Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const HeroSection = () => {

  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate('/login');
  };

  return (
    <section id="home">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Grid container direction="column" alignContent="space-around" sx={{ gap: '12px', padding: '120px' }}>
            <div style={{ mt: 12 }}>
              <Typography variant="h3" sx={{ fontFamily: 'Roboto', fontSize: '2.7rem', fontWeight: 'medium' }}>
                Make a <span style={{ color: '#4E3AB0' }}>difference</span> in
              </Typography>
              <Typography variant="h3" sx={{ fontFamily: 'Roboto', fontSize: '2.7rem', fontWeight: 'medium' }}>
                the lives of others
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                sx={{ width: 288, color: '#718096', fontSize: '2xl', fontWeight: 'medium', fontFamily: 'Roboto' }}
              >
                Bringing a stronger sense of ease, confidence, and self-mastery to those who are living with epilepsy.
              </Typography>
            </div>
            <div style={{ height: '12px' }}></div>
            <div style={{ mt: 12, display: 'flex', flexDirection: 'row' }}>
              <div>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#4E3AB0', ':hover': { backgroundColor: '#3d2d8c' } }}
                  onClick={navigateLogin}
                >
                  Get Started
                </Button>
              </div>
              {/* gap between buttons*/}
              <div style={{ width: 12 }}></div>
              <div>
                <Button variant="outlined" sx={{ color: '#4E3AB0' }}>
                  Watch Video
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img src={bedroom} alt="Bedroom" style={{ width: '35rem' }} />
        </Grid>
      </Grid>
    </section>
  );
};

export default HeroSection;
