import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const MyGridComponent = () => {
  const gridRef = useRef(null);
  const canvasRef = useRef(null);

  const captureGrid = async () => {
    if (gridRef.current) {
      // Capture the AG Grid area as an image
      const canvas = await html2canvas(gridRef.current, {
        useCORS: true,
        allowTaint: true,
      });
      const imgData = canvas.toDataURL("image/png");

      // Draw the captured image onto the HTML canvas
      const context = canvasRef.current.getContext("2d");
      const img = new Image();
      img.src = imgData;
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }
  };

  return (
    <div>
      <button onClick={captureGrid}>Capture Grid</button>
      <div
        ref={gridRef}
        className="ag-theme-alpine"
        style={{ height: 400, width: 600 }}
      >
        <AgGridReact
          // Your AG Grid properties here
          rowData={[{ col1: "Row 1", col2: "Data" }, { col1: "Row 2", col2: "More Data" }]}
          columnDefs={[{ headerName: "Column 1", field: "col1" }, { headerName: "Column 2", field: "col2" }]}
        />
      </div>
      <canvas ref={canvasRef} width={600} height={400} style={{ display: "block", marginTop: "20px" }}></canvas>
    </div>
  );
};

export default MyGridComponent;