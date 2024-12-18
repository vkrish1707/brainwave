function MyGridComponent() {
  const [scale, setScale] = useState(1);
  const gridRef = useRef(null);
  const baseColumnWidthsRef = useRef({});

  const onGridReady = (params) => {
    const allColumns = params.columnApi.getAllColumns();
    allColumns.forEach((col) => {
      const colId = col.getColId();
      const colDef = col.getColDef();
      baseColumnWidthsRef.current[colId] = colDef.width || 100;
    });
  };

  const adjustColumnWidths = (newScale) => {
    const colIds = Object.keys(baseColumnWidthsRef.current);
    colIds.forEach((colId) => {
      const newWidth = baseColumnWidthsRef.current[colId] * newScale;
      gridRef.current.api.setColumnWidth(colId, newWidth);
    });
  };

  return (
    <div style={{ height: "87vh", width: "100%", transformOrigin: "top left" }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        // ... other props
      />

      <div style={{ marginTop: "10px" }}>
        <label>Scale Columns: </label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={scale}
          onChange={(e) => {
            const newScale = parseFloat(e.target.value);
            setScale(newScale);
            adjustColumnWidths(newScale);
          }}
        />
      </div>
    </div>
  );
}