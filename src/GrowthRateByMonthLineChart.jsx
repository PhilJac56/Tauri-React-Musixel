import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { calculateGrowthRateByMonth } from './StatisticsCalculations';

// Component to render a line chart showing the monthly growth rate of earnings
const GrowthRateByMonthChart = ({ allTracks }) => {
  // Calculate the growth rates by month
  const growthRates = calculateGrowthRateByMonth(allTracks);
  // Extract the month-year keys and corresponding growth rates
  const monthsYears = Object.keys(growthRates);
  const rates = Object.values(growthRates);

  // Highcharts configuration options
  const options = {
    chart: {
      type: 'line' // Specify the chart type as line
    },
    title: {
      text: 'Monthly Growth Rate of $ Earnings' // Chart title
    },
    xAxis: {
      categories: monthsYears, // Set the categories for the x-axis
      title: {
        text: 'Month-Year' // X-axis title
      }
    },
    yAxis: {
      title: {
        text: 'Growth Rate (%)' // Y-axis title
      }
    },
    series: [{
      name: 'Growth Rate', // Series name
      data: rates // Data for the series
    }]
  };

  // Render the HighchartsReact component with the specified options
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default GrowthRateByMonthChart;
