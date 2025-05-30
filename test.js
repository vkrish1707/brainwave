// VPGroupingAgGrid.js
import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function VPGroupingAgGrid({ rowData }) {
  const columnDefs = useMemo(() => [
    {
      headerName: 'EBVP Node',
      field: 'ebvpNode',
      rowGroup: true,
      hide: true,
    },
    {
      headerName: 'VP Name',
      field: 'vpName',
      flex: 2,
      cellStyle: {
        fontSize: '16px',
        padding: '10px',
      }
    },
    {
      headerName: 'Q2 HC',
      field: 'q2HC',
      aggFunc: 'sum',
      flex: 1,
      cellStyle: {
        fontSize: '16px',
        textAlign: 'right',
      }
    },
    {
      headerName: 'Hired by WW19',
      field: 'hiredWW19',
      aggFunc: 'sum',
      flex: 1,
      cellStyle: {
        fontSize: '16px',
        textAlign: 'right',
      }
    },
    {
      headerName: 'Target',
      field: 'q2Target',
      aggFunc: 'sum',
      flex: 1,
      cellStyle: {
        fontSize: '16px',
        textAlign: 'right',
      }
    },
    {
      headerName: 'Delta',
      field: 'delta',
      valueGetter: params => params.data ? params.data.q2Target - params.data.q2HC : '',
      aggFunc: 'sum',
      flex: 1,
      cellStyle: {
        fontSize: '16px',
        textAlign: 'right',
      }
    }
  ], []);

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: true,
  }), []);

  const autoGroupColumnDef = useMemo(() => ({
    headerName: 'Group by EBVP Node',
    field: 'ebvpNode',
    cellRendererParams: {
      suppressCount: false,
    },
    cellStyle: {
      fontWeight: 'bold',
      fontSize: '18px',
      padding: '10px',
    }
  }), []);

  return (
    <div className="ag-theme-alpine" style={{ height: '700px', width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        groupIncludeFooter={true}
        groupIncludeTotalFooter={true}
        groupDefaultExpanded={-1}
        autoGroupColumnDef={autoGroupColumnDef}
        animateRows={true}
      />
    </div>
  );
}