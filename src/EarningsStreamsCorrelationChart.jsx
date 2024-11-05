import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Component to render a scatter plot showing the correlation between earnings and streams
const EarningsStreamsCorrelationChart = ({ allTracks }) => {
  // Map the track data to extract earnings and streams
  const data = allTracks.map((track) => {
    return [parseFloat(track[9]), parseInt(track[8], 10)]; // Earnings, Streams
  });

  // Highcharts configuration options
  const options = {
    chart: {
      type: 'scatter', // Specify the chart type as scatter
      zoomType: 'xy' // Enable zooming on both x and y axes
    },
    title: {
      text: 'Earnings and Streams correlation' // Chart title
    },
    xAxis: {
      title: {
        text: 'Gains' // X-axis title
      }
    },
    yAxis: {
      title: {
        text: 'Streams' // Y-axis title
      }
    },
    series: [{
      name: 'Tracks', // Series name
      data: data // Data for the series
    }]
  };

  // Render the HighchartsReact component with the specified options
  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
};

export default EarningsStreamsCorrelationChart;
