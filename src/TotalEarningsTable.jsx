import React from 'react';

// Component to render a table showing total earnings for each track
const TotalEarningsTable = ({ earningsData }) => {
  console.log(earningsData); // Log the earnings data for debugging

  return (
    <table>
      <thead>
        <tr>
          <th>N°</th>
          <th>Track Title</th>
          <th>Track Artist</th>
          <th>Total Earnings</th>
        </tr>
      </thead>
      <tbody>
        {/* Render each row of earnings data */}
        {earningsData.map((data, index) => (
          <tr key={index}>
            <td>{index + 1}</td> {/* Row number */}
            <td>{data.title}</td> {/* Track title */}
            <td>{data.artist}</td> {/* Track artist */}
            <td>{data.totalEarnings.toFixed(2)}</td> {/* Total earnings, formatted to 2 decimal places */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TotalEarningsTable;
