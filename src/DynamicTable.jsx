import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { aggregateData } from './StatisticsCalculations';

const DynamicTable = ({ allTracks }) => {
  const aggregatedData = aggregateData(allTracks);
  const data = Array.isArray(aggregatedData) ? Object.values(aggregatedData) : [];

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
    };
  }, []);

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
      <p>Note: the column "creations" is the total of mentioned creations for all months but you can have the same creation repertoried each month </p> {/* Votre commentaire ici */}
      <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
        <AgGridReact
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          rowData={data}
        />
      </div>
    </div>
  );
};


export default DynamicTable;
