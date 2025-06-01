// Updated HrMetricsReportsPage.js
import React, { useState, useEffect } from 'react';
import { SecureAgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const HrMetricsReportsPage = ({ reportData, ebvpField, ebvpValue }) => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    handleReportsData(reportData, ebvpField, ebvpValue);
  }, [reportData, ebvpField, ebvpValue]);

  const handleReportsData = (data, ebvpField, ebvpValue) => {
    if (!Array.isArray(data)) return [];

    const filteredData = ebvpField && ebvpValue
      ? data.filter(item => item[ebvpField] === ebvpValue)
      : data;

    const groupedMap = new Map();

    filteredData.forEach(item => {
      const groupKey = `${item.EBVP_TOP_NODE}__${item.EBVP_TOP_NODE_2}__${item.EBVP_TOP_NODE_3}`;

      if (!groupedMap.has(groupKey)) {
        groupedMap.set(groupKey, {
          EBVP_TOP_NODE: item.EBVP_TOP_NODE,
          EBVP_TOP_NODE_2: item.EBVP_TOP_NODE_2,
          EBVP_TOP_NODE_3: item.EBVP_TOP_NODE_3,
          q2HC: 0,
          hiredByQ2: 0,
          openReqsAfterQ2: 0,
          target: item.target || 0,
          vpDetails: []
        });
      }

      const group = groupedMap.get(groupKey);

      group.q2HC += Number(item.Q2_TO_DATE_HC || 0);
      group.hiredByQ2 += Number(item.HIRED_BY_Q2 || 0);
      group.openReqsAfterQ2 += Number(item.OPEN_REQS_AFTER_Q2 || 0);

      if (item.VP) {
        group.vpDetails.push({
          vpName: item.VP,
          q2HC: item.Q2_TO_DATE_HC || 0,
          hiredByQ2: item.HIRED_BY_Q2 || 0,
          openReqsAfterQ2: item.OPEN_REQS_AFTER_Q2 || 0,
        });
      }
    });

    setRowData(Array.from(groupedMap.values()));
  };

  const columnDefs = [
    { field: 'EBVP_TOP_NODE', headerName: 'EBVP Node', flex: 1 },
    { field: 'q2HC', headerName: 'Q2 To Date HC', flex: 1 },
    { field: 'hiredByQ2', headerName: 'Hired By Q2', flex: 1 },
    { field: 'openReqsAfterQ2', headerName: 'Open Reqs After Q2', flex: 1 },
    { field: 'target', headerName: 'Target', flex: 1 },
  ];

  const detailCellRenderer = (params) => {
    const detailColumns = [
      { field: 'vpName', headerName: 'VP Name', flex: 1 },
      { field: 'q2HC', headerName: 'Q2 HC', flex: 1 },
      { field: 'hiredByQ2', headerName: 'Hired Q2', flex: 1 },
      { field: 'openReqsAfterQ2', headerName: 'Open Reqs Q2', flex: 1 },
    ];

    return (
      <div className="ag-theme-alpine" style={{ height: 150 }}>
        <SecureAgGridReact
          rowData={params.data.vpDetails}
          columnDefs={detailColumns}
          domLayout="autoHeight"
        />
      </div>
    );
  };

  const gridOptions = {
    masterDetail: true,
    detailCellRendererFramework: detailCellRenderer,
    columnDefs,
    defaultColDef: {
      resizable: true,
      cellStyle: { fontSize: '16px', textAlign: 'center' },
    },
    animateRows: true
  };

  return (
    <div className="ag-theme-alpine report-grid" style={{ height: '90vh', width: '100%' }}>
      <SecureAgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        gridOptions={gridOptions}
        detailRowHeight={180}
      />
    </div>
  );
};

export default HrMetricsReportsPage;