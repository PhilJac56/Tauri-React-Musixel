import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StreamsAndEarningsCorrelationChart = ({ allTracks }) => {
  const data = allTracks.map(track => {
    return [
      parseInt(track[8], 10), // Streams
      parseFloat(track[9]) // Earnings
    ];
  });

  const options = {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    title: {
      text: 'Corrélation entre les streams et les gains'
    },
    xAxis: {
      title: {
        text: 'Streams'
      }
    },
    yAxis: {
      title: {
        text: 'Gains'
      }
    },
    series: [{
      name: 'Corrélation',
      data: data
    }]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default StreamsAndEarningsCorrelationChart;
