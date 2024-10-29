import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const MyGridComponent = () => {
  const gridRef = useRef(null);
  const canvasRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      // Show the modal with the canvas
      setIsModalOpen(true);
    }
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = canvasRef.current.toDataURL("image/png");
    link.download = "captured_grid.png";
    link.click();
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          rowData={[
            { col1: "Row 1", col2: "Data" },
            { col1: "Row 2", col2: "More Data" },
          ]}
          columnDefs={[
            { headerName: "Column 1", field: "col1" },
            { headerName: "Column 2", field: "col2" },
          ]}
        />
      </div>

      {/* Modal for showing the captured canvas */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              maxWidth: "90%",
            }}
          >
            <h3>Captured Grid</h3>
            <canvas ref={canvasRef} width={600} height={400} style={{ display: "block", marginBottom: "20px" }}></canvas>
            <button onClick={downloadImage} style={{ marginRight: "10px" }}>Download</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGridComponent;