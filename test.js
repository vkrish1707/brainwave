const getRowSpan = (params) => {
  const currentNode = params.data.ebvpNode;
  const allData = params.api.getDisplayedRowAtIndex(params.rowIndex).dataList;

  let span = 1;
  for (let i = params.rowIndex + 1; i < allData.length; i++) {
    if (allData[i].ebvpNode === currentNode) {
      span++;
    } else {
      break;
    }
  }
  return span;
};

const columnDefs = [
  {
    headerName: 'EBVP Node',
    field: 'ebvpNode',
    rowSpan: params => getRowSpan(params),
    cellClassRules: {
      'row-span-cell': 'true', // optional for custom style
    },
    cellStyle: { verticalAlign: 'middle' },
  },
  {
    headerName: 'VP Name',
    field: 'vpName',
    flex: 2,
    cellStyle: {
      fontSize: '16px',
      padding: '10px',
    },
  },
  // Add other columns...
];