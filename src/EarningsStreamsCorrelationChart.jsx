import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const EarningsStreamsCorrelationChart = ({ allTracks }) => {
  const data = allTracks.map((track) => {
    return [parseFloat(track[9]), parseInt(track[8], 10)]; // Earnings, Streams
  });

  const options = {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    title: {
      text: 'Earnings and Streams correlation'
    },
    xAxis: {
      title: {
        text: 'Gains'
      }
    },
    yAxis: {
      title: {
        text: 'Streams'
      }
    },
    series: [{
      name: 'Tracks',
      data: data
    }]
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
};

export default EarningsStreamsCorrelationChart;
