import React, { useEffect, useState } from 'react';
import ExcelJS from 'exceljs';
import Papa from 'papaparse';
import logo from './assets/logo.png';
import "./App.css";
import './styles.css';
import { initDB, addTrack, getAllTracks, addUploadedFileName, checkIfFileExists, clearAllData } from './indexedDB';
import TotalEarningsTable from './TotalEarningsTable';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AverageEarningsPerMonthChart from './AverageEarningsPerMonthChart';
import AverageStreamsPerArtistChart from './AverageStreamsPerArtistChart';
import DownloadsDistributionByTerritoryChart from './DownloadsDistributionByTerritoryChart';
import EarningsStdDevByTerritoryChart from './EarningsStdDevByTerritoryChart';
import EarningsStreamsCorrelationChart from './EarningsStreamsCorrelationChart';
import RetailerEarningsStreamsChart from './RetailerEarningsStreamsChart';
import StreamsByRetailerPieChart from './StreamsByRetailerPieChart';
import StreamsAndEarningsCorrelationChart from './StreamsAndEarningsCorrelationChart';
import GrowthRateByMonthLineChart from './GrowthRateByMonthLineChart';
import DynamicTable from './DynamicTable';

// Main application component
function App() {
  // Initialisation de la base de données IndexedDB au chargement du composant
  useEffect(() => {
    initDB(() => {
      loadEarningsData();
    });
  }, []);

  // États 
  const [earningsData, setEarningsData] = useState([]);
  const [showEarnings, setShowEarnings] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);  
  const [errorMessage, setErrorMessage] = useState(null);
  const [allTracks, setAllTracks] = useState([]);
  const [okMessage, setOkMessage] = useState(null);
  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    // Appeler la fonction pour charger les données
    const fetchData = async () => {
      const data = await getAllTracks();
      setAllTracks(data);
      loadEarningsData();
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    if (dataChanged) {
      const fetchData = async () => {
        const data = await getAllTracks();
        setAllTracks(data);
        loadEarningsData();
      };
  
      fetchData();
      setDataChanged(false);
    }
  }, [dataChanged]);

  // Gestionnaire pour le téléchargement de fichiers
  const handleFileUpload = async (event) => {
    console.log("Début de handleFileUpload");  // Ajouté pour le débogage
    const file = event.target.files[0];
    if (file) {
      console.log("Fichier trouvé");  // Ajouté pour le débogage
      const fileName = file.name;
      const fileExists = await checkIfFileExists(fileName);
      setUploadedFileName(fileName);
      console.log("Vérification de l'existence du fichier terminée");  // Ajouté pour le débogage
  
      // Utilisez ExcelJS pour les fichiers Excel
      const workbook = new ExcelJS.Workbook();
      const buffer = await file.arrayBuffer();
      await workbook.xlsx.load(buffer);
      const worksheet = workbook.worksheets[0];
      console.log("Fichier Excel lu avec succès");  
  
      if (fileExists) {
        setErrorMessage("Erreur ! Ce fichier a déjà été uploadé !");
        return;
      } else {
        setErrorMessage(null); // Réinitialiser le message d'erreur si tout va bien
        addUploadedFileName(fileName); // Ajouter le nom du fichier à la base de données
      }
  
      let columnMap = {};
      worksheet.getRow(1).eachCell((cell, colNumber) => {
        columnMap[cell.value] = colNumber;
      });

      const data = [];
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber <= 1) return;
        if (rowNumber === worksheet.rowCount) return;

        const rowData = [
          columnMap['Track Title'] ? row.getCell(columnMap['Track Title']).value || 'N/A' : 'N/A',
          columnMap['Track Artist'] ? (row.getCell(columnMap['Track Artist']).value || 'N/A').toString() : 'N/A',
          columnMap['Month'] ? (row.getCell(columnMap['Month']).value || 'N/A').toString() : 'N/A',
          columnMap['Year'] ? (row.getCell(columnMap['Year']).value || 'N/A').toString() : 'N/A',
          columnMap['Retailer'] ? (row.getCell(columnMap['Retailer']).value || 'N/A').toString() : 'N/A',
          columnMap['Customer Territory'] ? (row.getCell(columnMap['Customer Territory']).value || 'N/A').toString() : 'N/A',
          columnMap['Downloads'] ? (row.getCell(columnMap['Downloads']).value || '0').toString() : '0',
          columnMap['Creations'] ? (row.getCell(columnMap['Creations']).value || '0').toString() : '0',
          columnMap['Stream'] ? (row.getCell(columnMap['Stream']).value || '0').toString() : '0',
          columnMap['Earnings($)'] ? (row.getCell(columnMap['Earnings($)']).value || '0').toString() : '0'
        ];
        data.push(rowData);
        console.log("Données lues pour la ligne ", rowNumber, ": ", rowData);  // Log pour le débogage
      });

      // Envoyer les données à IndexedDB
      data.forEach((track) => {
        addTrack(track, loadEarningsData, setOkMessage);  // loadEarningsData est la fonction qui rafraîchit vos données
      });

      setDataChanged(true);
    }
  };
    
  // Fonction pour charger les données des gains
  const loadEarningsData = async () => {
    // Récupération de toutes les pistes de la base de données
    const allTracks = await getAllTracks();
    console.log(allTracks);  // Ajoutez cette ligne ici pour déboguer

    // Création d'un objet pour stocker les gains par titre et artiste
    const earningsMap = {};
    // Traitement de chaque piste pour calculer les gains totaux
    allTracks.forEach((track) => {
      const title = track[0];
      const artist = track[1];
      const earnings = parseFloat(track[9]); // Convertir en nombre
      const key = `${title}-${artist}`;
      
      if (!earningsMap[key]) {
        earningsMap[key] = {
          title,
          artist,
          totalEarnings: 0,
        };
      }
      earningsMap[key].totalEarnings += earnings;
    });
    // Tri des données par gains totaux et mise à jour de l'état
    const sortedData = Object.values(earningsMap).sort((a, b) => b.totalEarnings - a.totalEarnings);
  
    setEarningsData(sortedData);
    setShowEarnings(true);
  };
  
  // Rendu du composant
  return (
    <Router>
      <div>
        <div id="header">
          <img src={logo} alt="Musixel Logo" id="logo" />
          <h1>Welcome to Routenote Tauri react Musixel</h1>
          <input type="file" id="realFileBtn" accept=".xlsx,.xls,.csv" onChange={handleFileUpload} hidden />
          <button
            id="uploadButton"
            onClick={() => document.getElementById('realFileBtn').click()}
            style={{ marginRight: '10px' }}
          >
            Upload Routenote Excel File!
          </button>
          <button
            onClick={clearAllData}
            style={{ backgroundColor: 'red', color: 'white' }}
          >
            Clear all datas (warning this will delete all the datas)
          </button>

          {uploadedFileName && <p>Données du fichier {uploadedFileName} récupérées !</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <div id="container">
          <div id="left-menu">
            <Link to="/total-earnings">Alltime Top earnings Tracks</Link>
            <p><Link to="/dynamic-table">Dynamic table</Link></p>
            <p><Link to="/streams-by-retailer">Streams by retailer</Link></p>
            <p><Link to="/average-earnings-per-month">Avergage earnings by mounth</Link></p>
            <p><Link to="/average-streams-per-artist">Average streams by artist</Link></p>
            {/* <p><Link to="/downloads-distribution-by-territory">Downloads distribution by territory</Link></p>*/}
            <p><Link to="/earnings-std-dev-by-territory">Standard Deviation of Earnings by Territory</Link></p>
            <p><Link to="/earnings-streams-correlation">Earnings and Streams correlation</Link></p>
            <p><Link to="/retailer-earnings-streams">Retailer earning streams</Link></p>
            <p><Link to="/streams-and-earnings-correlation">Streams end earnings correlation</Link></p>
            <p><Link to="/growth-rate-by-month">Growth Rate by Month</Link></p>
            {/* Ajoutez d'autres liens ici pour les futurs graphiques */}
          </div>
          <div id="main-content">
            <Routes>
              <Route path="/total-earnings" element={showEarnings ? <TotalEarningsTable earningsData={earningsData} /> : <div>Chargement...</div>} />
              <Route path="/average-earnings-per-month" element={<AverageEarningsPerMonthChart allTracks={allTracks} />} />
              <Route path="/average-streams-per-artist" element={<AverageStreamsPerArtistChart allTracks={allTracks} />} />
              <Route path="/downloads-distribution-by-territory" element={<DownloadsDistributionByTerritoryChart allTracks={allTracks} />} />
              <Route path="/earnings-std-dev-by-territory" element={<EarningsStdDevByTerritoryChart allTracks={allTracks} />} />
              <Route path="/earnings-streams-correlation" element={<EarningsStreamsCorrelationChart allTracks={allTracks} />} />
              <Route path="/retailer-earnings-streams" element={<RetailerEarningsStreamsChart allTracks={allTracks} />} />
              <Route path="/streams-by-retailer" element={<StreamsByRetailerPieChart allTracks={allTracks} />} />
              <Route path="/streams-and-earnings-correlation" element={<StreamsAndEarningsCorrelationChart allTracks={allTracks} />} />
              <Route path="/growth-rate-by-month" element={<GrowthRateByMonthLineChart allTracks={allTracks} />} />
              <Route path="/dynamic-table" element={<DynamicTable allTracks={allTracks} />} />
              <Route path="*" element={<div> hello welcome to Musixel !
                <p>This is a light program to parse your excel Routenote Excel files and store it in a database .</p> 
                <p>Then you will see your stats in nice graphics and tables !</p>
                <p> Upload some files and click on one link on the menu to see the Stats, have fun !</p></div>} /> {/* Route par défaut */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;