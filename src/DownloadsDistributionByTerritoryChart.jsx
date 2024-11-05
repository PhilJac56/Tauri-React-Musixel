import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);
import { calculateDownloadsDistributionByTerritory } from './StatisticsCalculations';



const DownloadsDistributionByTerritoryChart = ({ allTracks }) => {
  // Calculate the downloads distribution by territory
  const downloadsDistribution = calculateDownloadsDistributionByTerritory(allTracks);

  // Highcharts options
  const options = {
    chart: {
      type: 'boxplot',
    },
    title: {
      text: 'Downloads distribution by territory',
    },
    xAxis: {
      categories: Object.keys(downloadsDistribution),
      title: {
        text: 'Client territory',
      },
    },
    yAxis: {
      title: {
        text: 'Downloads',
      },
    },
    series: [
      {
        name: 'Downloads',
        data: Object.values(downloadsDistribution),
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default DownloadsDistributionByTerritoryChart;
