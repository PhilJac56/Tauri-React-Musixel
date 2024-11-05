import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Component to render pie charts showing total streams and earnings by retailer
const StreamsByRetailerPieChart = ({ allTracks }) => {
  const retailerStreams = {};
  const retailerEarnings = {};

  // Process each track to aggregate streams and earnings by retailer
  allTracks.forEach((track) => {
    const retailer = track[4]; // Retailer name
    const streams = parseInt(track[8], 10); // Streams
    const earnings = parseFloat(track[9]); // Earnings

    if (!retailerStreams[retailer]) {
      retailerStreams[retailer] = 0;
    }
    if (!retailerEarnings[retailer]) {
      retailerEarnings[retailer] = 0;
    }

    retailerStreams[retailer] += streams;
    retailerEarnings[retailer] += earnings;
  });

  // Transform the aggregated streams data into a format suitable for Highcharts
  const seriesDataStreams = Object.keys(retailerStreams).map((retailer) => ({
    name: retailer,
    y: retailerStreams[retailer]
  }));

  // Transform the aggregated earnings data into a format suitable for Highcharts
  const seriesDataEarnings = Object.keys(retailerEarnings).map((retailer) => ({
    name: retailer,
    y: retailerEarnings[retailer]
  }));

  // Sort the streams data in descending order
  const sortedData = seriesDataStreams.sort((a, b) => b.y - a.y);

  // Highcharts configuration options for streams pie chart
  const optionsStreams = {
    chart: { type: 'pie' },
    title: { text: 'Total streams by retailer' },
    series: [{ name: 'Streams', data: seriesDataStreams }]
  };

  // Highcharts configuration options for earnings pie chart
  const optionsEarnings = {
    chart: { type: 'pie' },
    title: { text: 'Total gains by retailer' },
    series: [{ name: 'Gains', data: seriesDataEarnings }]
  };

  return (
    <div>
      <div>
        {/* Render the streams pie chart */}
        <HighchartsReact highcharts={Highcharts} options={optionsStreams} />
      </div>
      <div>
        {/* Render the earnings pie chart */}
        <HighchartsReact highcharts={Highcharts} options={optionsEarnings} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Retailer</th>
            <th>Streams</th>
            <th>$ Earnings</th>
          </tr>
        </thead>
        <tbody>
          {/* Render the sorted data in a table */}
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

