import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { calculateEarningsStdDevByTerritory } from './StatisticsCalculations';

const EarningsStdDevByTerritoryChart = ({ allTracks }) => {
  const data = calculateEarningsStdDevByTerritory(allTracks);
  const chartData = Object.entries(data).map(([name, y]) => ({ name, y }));

  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Standard Deviation of Earnings by Territory',
    },
    series: [
      {
        name: 'Écart-type',
        data: chartData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default EarningsStdDevByTerritoryChart;
