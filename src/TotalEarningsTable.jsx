import React from 'react';

const TotalEarningsTable = ({ earningsData }) => {
    console.log(earningsData);
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
        {earningsData.map((data, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{data.title}</td>
            <td>{data.artist}</td>
            <td>{data.totalEarnings.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TotalEarningsTable;
