import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export function SolutionCard(props) {
  return (
    <Box sx={{ minWidth: 200, maxWidth: 260, width: 250 }}>
      <Card variant="outlined" sx={{ height: 266 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              textAlign: 'center',
              p: 1,
              m: 1,
              //   bgcolor: 'background.paper',
              borderRadius: 1
            }}
          >
            <div>
              <img src={props.image} />
            </div>

            <div style={{ height: '12px' }}></div>
            <Typography variant="h4" sx={{ fontFamily: 'Roboto', fontWeight: 'bold' }} color="text.primary" gutterBottom>
              {props.title}
            </Typography>

            <div style={{ height: '12px' }}></div>
            <Typography variant="h5" sx={{ fontFamily: 'Roboto', fontWeight: 'bold' }} color="text.secondary">
              {props.description}
            </Typography>
          </Box>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    </Box>
  );
}

export function ServiceCard(props) {
  return (
    <Box sx={{ minWidth: 200, maxWidth: 260, width: 250 }}>
      <Card variant="outlined" sx={{ backgroundColor: props.bgcolor }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              textAlign: 'center',
              p: 1,
              m: 1,
              // bgcolor: props.color,
              borderRadius: 1
            }}
          >
            <div>
              <img src={props.image} />
            </div>

            <div style={{ height: '12px' }}></div>
            {props.color === undefined ? (
              <Typography variant="h4" sx={{ fontFamily: 'Roboto', fontWeight: 'bold' }} color="text.primary" gutterBottom>
                {props.title}
              </Typography>
            ) : (
              <Typography variant="h4" sx={{ fontFamily: 'Roboto', fontWeight: 'bold' }} color={props.color} gutterBottom>
                {props.title}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
