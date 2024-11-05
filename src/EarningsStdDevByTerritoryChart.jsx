import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { calculateEarningsStdDevByTerritory } from './StatisticsCalculations';

// Component to render a pie chart showing the standard deviation of earnings by territory
const EarningsStdDevByTerritoryChart = ({ allTracks }) => {
  // Calculate the standard deviation of earnings by territory
  const data = calculateEarningsStdDevByTerritory(allTracks);
  // Transform the data into a format suitable for Highcharts
  const chartData = Object.entries(data).map(([name, y]) => ({ name, y }));

  // Highcharts configuration options
  const options = {
    chart: {
      type: 'pie', // Specify the chart type as pie
    },
    title: {
      text: 'Standard Deviation of Earnings by Territory', // Chart title
    },
    series: [
      {
        name: 'Écart-type', // Series name
        data: chartData, // Data for the series
      },
    ],
  };

  // Render the HighchartsReact component with the specified options
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default EarningsStdDevByTerritoryChart;
