// Imports are used to bring in modules, components, or assets from other files or libraries into the current file.
// This allows you to use the functionality defined in those modules without having to rewrite the code.
// Below are various imports used in this file:

// Importing React and specific hooks (useEffect, useState) from the 'react' library
import React, { useEffect, useState } from 'react';

// Importing the ExcelJS library for handling Excel files
import ExcelJS from 'exceljs';

// Importing components and functions from 'react-router-dom' for routing
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

// Importing the PapaParse library for parsing CSV files
import Papa from 'papaparse';

// Importing an image asset
import logo from './assets/logo.png';

// Importing CSS files for styling
import './App.css';
import './styles.css';

// Importing functions from the local 'indexedDB' module
import { 
  initDB, addTrack, getAllTracks, addUploadedFileName, 
  checkIfFileExists, clearAllData 
} from './indexedDB';

// Importing various components for displaying data and charts
import TotalEarningsTable from './TotalEarningsTable';
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
  // Initialize IndexedDB on component load
  useEffect(() => {
    initDB(() => {
      loadEarningsData();
    });
  }, []);

  const [earningsData, setEarningsData] = useState([]);
  const [showEarnings, setShowEarnings] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [allTracks, setAllTracks] = useState([]);
  const [okMessage, setOkMessage] = useState(null);
  const [dataChanged, setDataChanged] = useState(false);

  // Fetch all tracks and load earnings data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTracks();
      setAllTracks(data);
      loadEarningsData();
    };
    fetchData();
  }, []);
  
  // Fetch all tracks and load earnings data when data changes
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

  // Handle file upload and process the file
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileExists = await checkIfFileExists(fileName);
      setUploadedFileName(fileName);

      const workbook = new ExcelJS.Workbook();
      const buffer = await file.arrayBuffer();
      await workbook.xlsx.load(buffer);
      const worksheet = workbook.worksheets[0];

      if (fileExists) {
        setErrorMessage("Error! This file has already been uploaded.");
        return;
      } else {
        setErrorMessage(null);
        addUploadedFileName(fileName);
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
      });

      data.forEach((track) => {
        addTrack(track, loadEarningsData, setOkMessage);
      });
      setDataChanged(true);
    }
  };

  // Load earnings data from IndexedDB
  const loadEarningsData = async () => {
    const allTracks = await getAllTracks();

    const earningsMap = {};
    allTracks.forEach((track) => {
      const title = track[0];
      const artist = track[1];
      const earnings = parseFloat(track[9]);
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
    
    const sortedData = Object.values(earningsMap).sort((a, b) => b.totalEarnings - a.totalEarnings);
    setEarningsData(sortedData);
    setShowEarnings(true);
  };
  // Render method in React is responsible for describing what the UI should look like.
  // It returns a React element, which is a lightweight description of what to render.
  // The render method is called every time the component's state or props change.
  return (
    <Router>
      <div className="app-container">
        <div id="header">
          <img src={logo} alt="Musixel Logo" id="logo" />
          <h1>Welcome to Musixel</h1>
          <input type="file" id="realFileBtn" accept=".xlsx,.xls,.csv" onChange={handleFileUpload} hidden />
          <button id="uploadButton" onClick={() => document.getElementById('realFileBtn').click()}>
            Upload Routenote Excel File
          </button>
          <button onClick={clearAllData} className="clear-data-btn">
            Clear all data (Warning: this will delete all records)
          </button>

          {uploadedFileName && <p>Data from {uploadedFileName} successfully retrieved!</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <div id="container">
          <nav id="left-menu">
            <Link to="/total-earnings">All-time Top Earning Tracks</Link>
            <Link to="/dynamic-table">Dynamic Table</Link>
            <Link to="/streams-by-retailer">Streams by Retailer</Link>
            <Link to="/average-earnings-per-month">Average Earnings by Month</Link>
            <Link to="/average-streams-per-artist">Average Streams by Artist</Link>
            <Link to="/earnings-std-dev-by-territory">Standard Deviation of Earnings by Territory</Link>
            <Link to="/earnings-streams-correlation">Earnings and Streams Correlation</Link>
            <Link to="/retailer-earnings-streams">Retailer Earnings Streams</Link>
            <Link to="/streams-and-earnings-correlation">Streams and Earnings Correlation</Link>
            <Link to="/growth-rate-by-month">Growth Rate by Month</Link>
          </nav>
          <main id="main-content">
            <Routes>
              <Route path="/" element={<div>Welcome to Musixel</div>} />
              <Route path="/total-earnings" element={showEarnings ? <TotalEarningsTable earningsData={earningsData} /> : <div>Loading...</div>} />
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
            </Routes>
          </main>
        </div>
      </div>
      {/* Footer */}
      <footer className="footer">
        <p>
          Musixel by <a href="https://test.com" target="_blank" rel="noopener noreferrer">Philjac56</a> on Github - MIT license - For educational.
        </p>
      </footer>
    </Router>
  );
}

// Export the App component as the default export
export default App;