import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { calculateGrowthRateByMonth } from './StatisticsCalculations';

const GrowthRateByMonthChart = ({ allTracks }) => {
  const growthRates = calculateGrowthRateByMonth(allTracks);
  const monthsYears = Object.keys(growthRates);
  const rates = Object.values(growthRates);

  const options = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Monthly Growth Rate of $ Earnings'
    },
    xAxis: {
      categories: monthsYears,
      title: {
        text: 'Month-Year'
      }
    },
    yAxis: {
      title: {
        text: 'Growth Rate (%)'
      }
    },
    series: [{
      name: 'Growth Rate',
      data: rates
    }]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default GrowthRateByMonthChart;
