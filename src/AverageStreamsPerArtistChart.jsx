import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { calculateAverageStreamsPerArtist } from './StatisticsCalculations';

const AverageStreamsPerArtistChart = ({ allTracks }) => {
  // Calculer la moyenne des streams par artiste
  const averageStreamsPerArtist = calculateAverageStreamsPerArtist(allTracks);

  // Options pour Highcharts
  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Average streams by artist',
    },
    xAxis: {
      categories: Object.keys(averageStreamsPerArtist),
      title: {
        text: 'Artist',
      },
    },
    yAxis: {
      title: {
        text: 'Streams average',
      },
    },
    series: [
      {
        name: 'Streams',
        data: Object.values(averageStreamsPerArtist),
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default AverageStreamsPerArtistChart;
