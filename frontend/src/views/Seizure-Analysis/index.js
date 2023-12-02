// material-ui
import { Typography } from '@mui/material';
import Table from 'views/utilities/table.js'
// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const ActivityLogsPage = () => {
  return (
  <>
  <br></br>
  <MainCard title="Seizure Analysis">
    {/* <Typography variant="body2">Stream Page</Typography> */}
     
  <Table/>
  </MainCard>
</>)
};

export default ActivityLogsPage;
