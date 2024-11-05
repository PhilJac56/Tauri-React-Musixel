import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Component to render a scatter plot showing the correlation between retailer earnings and streams
const RetailerEarningsStreamsChart = ({ allTracks }) => {
  const retailerData = {};

  // Process each track to aggregate earnings and streams by retailer
  allTracks.forEach((track) => {
    const retailer = track[4]; // Retailer name
    const earnings = parseFloat(track[9]); // Earnings
    const streams = parseInt(track[8], 10); // Streams

    if (!retailerData[retailer]) {
      retailerData[retailer] = [];
    }

    retailerData[retailer].push([streams, earnings]);
  });

  // Transform the aggregated data into a format suitable for Highcharts
  const seriesData = Object.keys(retailerData).map((retailer) => {
    return {
      name: retailer,
      data: retailerData[retailer]
    };
  });

  // Highcharts configuration options
  const options = {
    chart: {
      type: 'scatter', // Specify the chart type as scatter
      zoomType: 'xy' // Enable zooming on both x and y axes
    },
    title: {
      text: 'Retailer earning streams' // Chart title
    },
    xAxis: {
      title: {
        text: 'Streams' // X-axis title
      }
    },
    yAxis: {
      title: {
        text: 'Gains' // Y-axis title
      }
    },
    series: seriesData // Data for the series
  };

  // Render the HighchartsReact component with the specified options
  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
};

export default RetailerEarningsStreamsChart;