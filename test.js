const formatColorCell = (value) => {
  if (!value) return "";

  // If it's a color, get label and apply background
  const colorData = colorLegend[value.toUpperCase()];
  if (colorData) {
    return `<div style="background-color: ${colorData.background}; color: white; padding: 5px; border-radius: 5px; text-align: center;">
              ${colorData.label}
            </div>`;
  }

  // If it's a normal string, return as-is
  return const columnDefs = [
  {
    headerName: "Previous Value",
    field: "previousValue",
    cellRenderer: (params) =>
      params.data.type === "color" ? formatColorCell(params.value) : params.value,
  },
  {
    headerName: "New Value",
    field: "newValue",
    cellRenderer: (params) =>
      params.data.type === "color" ? formatColorCell(params.value) : params.value,
  }
];

