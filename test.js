/* Scoped to your AG Grid instance */
.report-grid.ag-theme-alpine {
  --ag-background-color: #0d1117;
  --ag-header-background-color: #161b22;
  --ag-odd-row-background-color: #0f141a;
  --ag-row-hover-color: #1f2a38;
  --ag-font-size: 14px;
  --ag-border-color: transparent;
  --ag-header-foreground-color: #ffffff;
  --ag-foreground-color: #e4e6eb;
  --ag-header-height: 48px;
  --ag-row-height: 40px;
  font-family: 'Segoe UI', sans-serif;
}

/* Header cells */
.report-grid .ag-header-cell {
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
  background-color: #161b22 !important;
  border-bottom: 1px solid #30363d;
  text-align: center;
}

/* Grid cells */
.report-grid .ag-cell {
  padding: 12px;
  color: #d0d0d0;
  font-weight: 400;
  text-align: center;
  border-right: 1px solid #2c313a;
}

/* First cell (EBVP Node) with span – remove inner borders */
.report-grid .ag-cell.row-span-cell {
  border-bottom: none !important;
  background-color: #0d1117 !important;
  font-weight: 600;
  font-size: 15px;
}

/* Row hover effect */
.report-grid .ag-row:hover {
  background-color: #1a202c !important;
}

/* Optional scrollbar appearance */
.report-grid .ag-body-horizontal-scroll-viewport,
.report-grid .ag-body-vertical-scroll-viewport {
  scrollbar-width: thin;
  scrollbar-color: #4a4a4a #161b22;
}