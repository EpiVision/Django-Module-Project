import React from 'react';
import Logo from 'ui-component/Logo';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const HomeFooter = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'whitesmoke',
        p: 3
      }}
      component="footer"
    >
      <Container>
        <Grid container className="" sx={{ display: 'flex', flexDirection: 'row' }}>
          <Grid item xs={12} sm={6}>
            <Logo />
          </Grid>
          <Grid item xs={12} sm={6} >
            <div style={{height:"12px"}}></div>
            <Typography variant="body2" color="text.secondary" align="center">
              {'Copyright © '}
              <Link color="inherit" href="#">
                EpiVision
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeFooter;
