import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const RetailerEarningsStreamsChart = ({ allTracks }) => {
  const retailerData = {};

  allTracks.forEach((track) => {
    const retailer = track[4];
    const earnings = parseFloat(track[9]);
    const streams = parseInt(track[8], 10);

    if (!retailerData[retailer]) {
      retailerData[retailer] = [];
    }

    retailerData[retailer].push([streams, earnings]);
  });

  const seriesData = Object.keys(retailerData).map((retailer) => {
    return {
      name: retailer,
      data: retailerData[retailer]
    };
  });

  const options = {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    title: {
      text: 'Retailer earning streams'
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
    series: seriesData
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
};

export default RetailerEarningsStreamsChart;
