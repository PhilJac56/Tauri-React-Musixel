import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { calculateAverageEarningsPerMonth } from './StatisticsCalculations';

const AverageEarningsPerMonthChart = ({ allTracks }) => {
  const averageEarningsByYearAndMonth = calculateAverageEarningsPerMonth(allTracks);

  // Regrouper les données par année
  const dataByYear = {};
  for (const [yearMonthKey, average] of Object.entries(averageEarningsByYearAndMonth)) {
    const [year, month] = yearMonthKey.split('-');
    if (!dataByYear[year]) {
      dataByYear[year] = {};
    }
    dataByYear[year][month] = average;
  }

  return (
    <div>
      {Object.keys(dataByYear).map((year) => (
        <div key={year}>
          <h2>{`Average Earnings for ${year}`}</h2>
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: { type: 'column' },
              title: { text: `Average Earnings for ${year}` },
              xAxis: {
                categories: Object.keys(dataByYear[year]),
                title: { text: 'Month' },
              },
              yAxis: { title: { text: 'Average Earnings' } },
              series: [
                {
                  name: 'Average Earnings',
                  data: Object.values(dataByYear[year]),
                },
              ],
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default AverageEarningsPerMonthChart;