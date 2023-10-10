// material-ui
import { Typography } from '@mui/material';
import Table from 'views/utilities/table.js'
// project imports
import MainCard from 'ui-component/cards/MainCard';
import FiltersGrid from './FiltersGrid.js'
// ==============================|| SAMPLE PAGE ||============================== //

const ActivityLogsPage = () => (
  <>
  <br></br>
  <MainCard title="Activity Logs">
    {/* <Typography variant="body2">Stream Page</Typography> */}
     <FiltersGrid/>
  <Table/>
  </MainCard>
</>
);

export default ActivityLogsPage;
