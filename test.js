// Update: handleReportsData remains unchanged (it already groups by EBVP level properly)

// AG Grid column definitions with dynamic VP column and master-detail setup
const getColumnDefs = (ebvpField) => {
  const columns = [
    {
      headerName: 'EBVP Node',
      field: 'ebvpNode',
      rowSpan: rowSpan,
    },
  ];

  if (ebvpField === 'EBVP_TOP_NODE') {
    columns.push({
      headerName: 'VP Name',
      field: 'vpName',
      flex: 1,
      cellRenderer: (params) => {
        const vps = params.data?.vpDetails || [];
        return vps.length > 1
          ? `${vps[0].vpName} (+${vps.length - 1} more)`
          : vps[0]?.vpName || '';
      },
    });
  }

  columns.push(
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
    }
  );

  return columns;
};

// Master-detail configuration for AG Grid
const detailCellRendererParams = {
  detailGridOptions: {
    columnDefs: [
      { headerName: 'VP Name', field: 'vpName' },
      { headerName: 'Q2 HC', field: 'q2HC' },
      { headerName: 'Hired By Q2', field: 'hiredByQ2' },
      { headerName: 'Open Reqs After Q2', field: 'openReqsAfterQ2' },
    ],
  },
  getDetailRowData: (params) => {
    params.successCallback(params.data?.vpDetails || []);
  },
};

// Grid setup
const gridOptions = {
  columnDefs: getColumnDefs(ebvpField),
  rowData: rowData,
  masterDetail: true,
  detailCellRendererParams: ebvpField === 'EBVP_TOP_NODE' ? detailCellRendererParams : undefined,
};