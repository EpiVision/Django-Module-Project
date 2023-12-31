import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import ActivityNameSelection from './ActivityNameSelection.js'
import DaySelection from './DaySelection.js'
import Button from '@mui/material/Button';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {/* {Array.from(Array(6)).map((_, index) => (
        ))} */}
          <Grid xs={2} sm={4} md={4} key={0}>
            <Item>
                <ActivityNameSelection/>
            </Item>
          </Grid>
          <Grid xs={2} sm={4} md={4} key={1}>
            <Item>
                <DaySelection/>
            </Item>
          </Grid>
          <Grid xs={2} sm={4} md={4} key={2}>
            <Item> <DaySelection/> </Item>
          </Grid>
          <Grid xs={2} sm={4} md={4} key={3}>
            <Item><DaySelection/></Item>
          </Grid>
          <Grid xs={2} sm={4} md={4} key={4}>
            <Item><DaySelection/></Item>
          </Grid>
          <Grid xs={2} sm={4} md={4} key={5}>
            <Item>
             <Button variant="contained" >
             {/* <Button variant="contained" endIcon={<SendIcon />}> */}
        Search
      </Button>
            </Item>
          </Grid>
          
      </Grid>
    </Box>
  );
}
