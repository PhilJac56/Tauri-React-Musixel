import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StreamsByRetailerPieChart = ({ allTracks }) => {
  const retailerStreams = {};
  const retailerEarnings = {};

  allTracks.forEach((track) => {
    const retailer = track[4];
    const streams = parseInt(track[8], 10);
    const earnings = parseFloat(track[9]);

    if (!retailerStreams[retailer]) {
      retailerStreams[retailer] = 0;
    }
    if (!retailerEarnings[retailer]) {
      retailerEarnings[retailer] = 0;
    }

    retailerStreams[retailer] += streams;
    retailerEarnings[retailer] += earnings;
  });

  const seriesDataStreams = Object.keys(retailerStreams).map((retailer) => ({
    name: retailer,
    y: retailerStreams[retailer]
  }));

  const seriesDataEarnings = Object.keys(retailerEarnings).map((retailer) => ({
    name: retailer,
    y: retailerEarnings[retailer]
  }));

  const sortedData = seriesDataStreams.sort((a, b) => b.y - a.y);

  const optionsStreams = {
    chart: { type: 'pie' },
    title: { text: 'Total streams by retailer' },
    series: [{ name: 'Streams', data: seriesDataStreams }]
  };

  const optionsEarnings = {
    chart: { type: 'pie' },
    title: { text: 'Total gains by retailer' },
    series: [{ name: 'Gains', data: seriesDataEarnings }]
  };

  return (
    <div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={optionsStreams} />
      </div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={optionsEarnings} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Retailer</th>
            <th>Streams</th>
            <th> $Earnings</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.y}</td>
              <td>{retailerEarnings[data.name]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StreamsByRetailerPieChart;

