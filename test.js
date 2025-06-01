const getColumnDefs = (ebvpField) => {
  const baseCols = [
    {
      headerName: 'EBVP Node',
      field: 'ebvpNode',
      rowSpan: rowSpan,
      cellRenderer: 'MergedCellRender',
    },
    {
      headerName: 'Q2 To Date HC',
      field: 'q2HC',
      aggFunc: 'sum',
      flex: 1,
      cellStyle: { fontSize: '16px', textAlign: 'center' },
    },
    {
      headerName: "Hired by Q2'25 Start Date",
      field: 'hiredByQ2',
      aggFunc: 'sum',
      flex: 1,
      cellStyle: { fontSize: '16px', textAlign: 'right' },
    },
    {
      headerName: 'Q2 Target',
      field: 'target',
      aggFunc: 'sum',
      flex: 1,
      cellStyle: { fontSize: '16px', textAlign: 'right' },
    },
    {
      headerName: 'Delta to Target',
      valueGetter: (params) => {
        const { target, q2HC } = params.data;
        return target - q2HC;
      },
      flex: 1,
      cellStyle: { fontSize: '16px', textAlign: 'right' },
    },
    {
      headerName: 'Open Reqs After Q2',
      field: 'openReqsAfterQ2',
      aggFunc: 'sum',
      flex: 1,
      cellStyle: { fontSize: '16px', textAlign: 'right' },
    }
  ];

  if (ebvpField === 'EBVP_TOP_NODE') {
    return baseCols;
  }

  // If grouping by EBVP_TOP_NODE_2 or deeper, show VP Name column
  return [
    {
      headerName: 'VP Name',
      field: 'vpName',
      flex: 1,
      cellStyle: { fontSize: '16px', textAlign: 'center' },
    },
    ...baseCols
  ];
};

const detailCellRendererParams = {
  detailGridOptions: {
    columnDefs: getColumnDefs('VP'),  // Same structure but for vpDetails array
    defaultColDef: {
      flex: 1,
      resizable: true,
    },
  },
  getDetailRowData: (params) => {
    params.successCallback(params.data.vpDetails || []);
  }
};
const gridOptions = {
  columnDefs: getColumnDefs(currentEbvpField),
  rowData: rowData,
  masterDetail: true,
  detailCellRendererParams,
  groupIncludeFooter: true,
  animateRows: true,
};
