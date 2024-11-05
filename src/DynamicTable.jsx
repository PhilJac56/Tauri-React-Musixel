import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { aggregateData } from './StatisticsCalculations';

// DynamicTable component to display aggregated track data in a table
const DynamicTable = ({ allTracks }) => {
  // Aggregate the track data
  const aggregatedData = aggregateData(allTracks);
  // Convert aggregated data to an array if it's an object
  const data = Array.isArray(aggregatedData) ? Object.values(aggregatedData) : [];

  // Default column definitions with sorting and filtering enabled
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
    };
  }, []);

  // Column definitions for the table
  const columnDefs = [
    { field: 'title', headerName: 'Track Title' },
    { field: 'artist', headerName: 'Track Artist' },
    { field: 'downloads', headerName: 'Downloads' },
    { field: 'creations', headerName: 'Creations' },
    { field: 'streams', headerName: 'Streams' },
    { field: 'earnings', headerName: 'Earnings' },
  ];

  return (
    <div>
      {/* Note about the "creations" column */}
      <p>Note: the column "creations" is the total of mentioned creations for all months but you can have the same creation repertoried each month </p>
      <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
        <AgGridReact
          defaultColDef={defaultColDef} // Apply default column definitions
          columnDefs={columnDefs} // Set column definitions
          rowData={data} // Set row data
        />
      </div>
    </div>
  );
};

export default DynamicTable;
