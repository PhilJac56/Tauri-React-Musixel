//this page is no longer used in application

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CustomerTerritoryChart = ({ allTracks }) => {
  // Vérifiez si allTracks contient les données attendues
  console.log('allTracks:', allTracks);

  // Créer un objet pour stocker les données par territoire et par mois
  const dataByTerritoryAndMonth = {};
  const uniqueMonths = new Set();

  allTracks.forEach((track) => {
    const territory = track[6]; // Assumant que "Customer Territory" est à l'index 6
    const month = track[2]; // Assumant que "Month" est à l'index 2

    uniqueMonths.add(month);

    if (!dataByTerritoryAndMonth[territory]) {
      dataByTerritoryAndMonth[territory] = {};
    }

    if (!dataByTerritoryAndMonth[territory][month]) {
      dataByTerritoryAndMonth[territory][month] = 0;
    }

    dataByTerritoryAndMonth[territory][month]++;
  });

  // Calculer les pourcentages
  const total = allTracks.length;
  Object.keys(dataByTerritoryAndMonth).forEach((territory) => {
    Object.keys(dataByTerritoryAndMonth[territory]).forEach((month) => {
      dataByTerritoryAndMonth[territory][month] = (dataByTerritoryAndMonth[territory][month] / total) * 100;
    });
  });

  // Préparer les données pour Highcharts
  const highchartsSeries = Object.keys(dataByTerritoryAndMonth).map((territory) => {
    return {
      name: territory,
      data: Array.from(uniqueMonths).map(month => dataByTerritoryAndMonth[territory][month] || 0)
    };
  });

  // Options pour Highcharts
  const options = {
    chart: {
      type: 'area',
    },
    title: {
      text: 'Répartition par territoire client',
    },
    xAxis: {
      categories: Array.from(uniqueMonths),
    },
    yAxis: {
      labels: {
        format: '{value}%',
      },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y:.1f}%</b>',
    },
    plotOptions: {
      area: {
        stacking: 'percent',
      },
    },
    series: highchartsSeries,
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default CustomerTerritoryChart;


