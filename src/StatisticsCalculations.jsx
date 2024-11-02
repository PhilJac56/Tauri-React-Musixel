import * as simpleStats from 'simple-statistics';


// Fonction pour calculer les pourcentages d'occurrences des territoires
export const calculateTerritoryPercentages = (allTracks) => {
  const territoryCounts = {};
  allTracks.forEach((track) => {
    const territory = track[5];
    territoryCounts[territory] = (territoryCounts[territory] || 0) + 1;
  });

  const total = allTracks.length;
  const territoryPercentages = {};

  for (const [territory, count] of Object.entries(territoryCounts)) {
    territoryPercentages[territory] = (count / total) * 100;
  }

  return territoryPercentages;
};

// Fonction pour calculer le total des gains
export const calculateTotalEarnings = (allTracks) => {
  const earnings = allTracks.map((track) => parseFloat(track[9]));
  return simpleStats.sum(earnings);
};

// Fonction pour calculer le total des streams
export const calculateTotalStreams = (allTracks) => {
  const streams = allTracks.map((track) => parseInt(track[8], 10));
  return simpleStats.sum(streams);
};

// Fonction pour calculer le total des téléchargements (downloads)
export const calculateTotalDownloads = (allTracks) => {
    const downloads = allTracks.map((track) => parseInt(track[6], 10));
    return simpleStats.sum(downloads);
  };
  
  // Fonction pour calculer le total des créations
  export const calculateTotalCreations = (allTracks) => {
    const creations = allTracks.map((track) => parseInt(track[7], 10));
    return simpleStats.sum(creations);
  };
  
  // Fonction pour calculer le total de l'année
  export const calculateTotalYear = (allTracks, year) => {
    const filteredTracks = allTracks.filter((track) => track[3] === year);
    return filteredTracks.length;
  };
  
  // Fonction pour calculer les statistiques par artiste
  export const calculateStatsByArtist = (allTracks) => {
    const statsByArtist = {};
    allTracks.forEach((track) => {
      const artist = track[1];
      statsByArtist[artist] = statsByArtist[artist] || { earnings: 0, streams: 0, downloads: 0, creations: 0 };
      statsByArtist[artist].earnings += parseFloat(track[9]);
      statsByArtist[artist].streams += parseInt(track[8], 10);
      statsByArtist[artist].downloads += parseInt(track[6], 10);
      statsByArtist[artist].creations += parseInt(track[7], 10);
    });
    return statsByArtist;
  };
  
  // Fonction pour trouver le "Hot Track Title"
  export const findHotTrackTitle = (allTracks) => {
    const trackCounts = {};
    allTracks.forEach((track) => {
      const title = track[0];
      trackCounts[title] = (trackCounts[title] || 0) + parseInt(track[8], 10);
    });
    const hotTrack = Object.keys(trackCounts).reduce((a, b) => (trackCounts[a] > trackCounts[b] ? a : b));
    return hotTrack;
  };

  // Fonction pour calculer la moyenne des gains par mois
  export const calculateAverageEarningsPerMonth = (allTracks) => {
    const averageEarningsByYearAndMonth = {};
  
    allTracks.forEach((track) => {
      const month = track[2];
      const year = track[3]; // Nouveau : récupération de l'année
      const earnings = parseFloat(track[9]);
  
      const yearMonthKey = `${year}-${month}`; // Nouveau : clé unique pour année et mois
  
      if (!averageEarningsByYearAndMonth[yearMonthKey]) {
        averageEarningsByYearAndMonth[yearMonthKey] = {
          totalEarnings: 0,
          count: 0,
        };
      }
  
      averageEarningsByYearAndMonth[yearMonthKey].totalEarnings += earnings;
      averageEarningsByYearAndMonth[yearMonthKey].count++;
    });
  
    // Calcul de la moyenne
    const averageEarnings = {};
    for (const [yearMonthKey, data] of Object.entries(averageEarningsByYearAndMonth)) {
      averageEarnings[yearMonthKey] = data.totalEarnings / data.count;
    }
  
    return averageEarnings;
  };
// Fonction pour calculer la moyenne des streams par artiste
export const calculateAverageStreamsPerArtist = (allTracks) => {
  const artistStreams = {};
  const artistCounts = {};

  allTracks.forEach((track) => {
    const artist = track[1];
    const streams = parseInt(track[8], 10);

    artistStreams[artist] = (artistStreams[artist] || 0) + streams;
    artistCounts[artist] = (artistCounts[artist] || 0) + 1;
  });

  const averageStreamsPerArtist = {};

  for (const [artist, totalStreams] of Object.entries(artistStreams)) {
    averageStreamsPerArtist[artist] = totalStreams / artistCounts[artist];
  }

  return averageStreamsPerArtist;
};
// Fonction pour calculer la distribution des téléchargements par territoire
export const calculateDownloadsDistributionByTerritory = (allTracks) => {
  const territoryDownloads = {};

  allTracks.forEach((track) => {
    const territory = track[(5)];
    const downloads = parseInt(track[6], 10);

    if (!territoryDownloads[territory]) {
      territoryDownloads[territory] = [];
    }
    territoryDownloads[territory].push(downloads);
  });

  return territoryDownloads;
};

// Ajoutez cette fonction après vos autres fonctions de calcul
export const calculateEarningsStdDevByTerritory = (allTracks) => {
  const territoryEarnings = {};

  allTracks.forEach((track) => {
    const territory = track[5];
    const earnings = parseFloat(track[9]);

    if (!territoryEarnings[territory]) {
      territoryEarnings[territory] = [];
    }

    territoryEarnings[territory].push(earnings);
  });

  const territoryStdDev = {};

  for (const [territory, earnings] of Object.entries(territoryEarnings)) {
    territoryStdDev[territory] = simpleStats.standardDeviation(earnings);
  }

  return territoryStdDev;
};

  // ... Vos autres fonctions

  export const calculateGrowthRateByMonth = (allTracks) => {
    const monthlyEarnings = {};
    allTracks.forEach((track) => {
      const month = track[2];
      const year = track[3];
      const earnings = parseFloat(track[9]);
      const monthYear = `${month}-${year}`;
  
      if (!monthlyEarnings[monthYear]) {
        monthlyEarnings[monthYear] = 0;
      }
  
      monthlyEarnings[monthYear] += earnings;
    });
  
    const monthsYears = Object.keys(monthlyEarnings).sort();
    const growthRates = {};
  
    let lastMonthEarnings = 0;
    monthsYears.forEach((monthYear) => {
      const earnings = monthlyEarnings[monthYear];
      if (lastMonthEarnings !== 0) {
        growthRates[monthYear] = ((earnings - lastMonthEarnings) / lastMonthEarnings) * 100;
      }
      lastMonthEarnings = earnings;
    });
  
    return growthRates;
  };
  

export const calculatePercentiles = (allTracks) => {
  const earnings = allTracks.map((track) => parseFloat(track[9])).sort((a, b) => a - b);
  const percentiles = [25, 50, 75].map((percentile) => {
    const index = Math.floor((percentile / 100) * earnings.length);
    return earnings[index];
  });

  return percentiles;
};
// ... Vos autres fonctions

export const aggregateData = (allTracks) => {
  const aggregatedData = {};
  allTracks.forEach((track) => {
    const title = track[0];
    const artist = track[1];
    const downloads = parseInt(track[6], 10);
    const creations = parseInt(track[7], 10);
    const streams = parseInt(track[8], 10);
    const earnings = parseFloat(track[9]);

    if (!aggregatedData[title]) {
      aggregatedData[title] = {
        title,
        artist,
        downloads: 0,
        creations: 0,
        streams: 0,
        earnings: 0.0,
      };
    }

    aggregatedData[title].downloads += downloads;
    aggregatedData[title].creations += creations;
    aggregatedData[title].streams += streams;
    aggregatedData[title].earnings += earnings;
  });

  return Object.values(aggregatedData);
};


// Ajoutez d'autres fonctions de calcul au besoin
// import {   calculateTerritoryPercentages, calculateAverageEarningsPerMonth, calculateTotalEarnings,  calculateTotalStreams,  calculateTotalDownloads,  calculateTotalCreations,  calculateTotalYear,  calculateStatsByArtist, findHotTrackTitle} from './StatisticsCalculations';
