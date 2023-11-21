import { useEffect, useState } from 'react';

// material-ui
import { Card, CardContent, Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { PieChart } from './PieChart.tsx';
import { BarChart } from './HorizontalBarChart.tsx';
import {VerticalBarChart} from './VerticalBarChart.tsx';
import { LineChart } from './LineChart.tsx';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Card>
          <CardContent style={{height:360}} >
            <BarChart />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item sm={6} xs={12} md={6} lg={4}>
            <Card>
              <CardContent style={{height:360}}>
                <PieChart />
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={4}>
            <Card>
              <CardContent style={{height:360}}>
                <VerticalBarChart />
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={4}>
            <Card>
              <CardContent style={{height:360}}>
                <LineChart />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
