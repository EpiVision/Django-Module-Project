// material-ui
import { Typography } from '@mui/material';
import Table from 'views/utilities/table.js'
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
// ==============================|| SAMPLE PAGE ||============================== //
import StreamGrid from './StreamGrid.js'
const StreamPage = () => (
  <>
  <br></br>
  <MainCard title="RTSP Stream">
    {/* <Typography variant="body2">Stream Page</Typography> */}
     <StreamGrid/>  
  <Table/>
    
  </MainCard>
</>
);

export default StreamPage;
