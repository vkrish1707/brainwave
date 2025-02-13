import React, { useState } from "react";
import { Modal, Button } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const AgGridModal = ({ open, handleClose, rowData }) => {
    const [columnDefs] = useState([
        { headerName: "ID", field: "id", filter: true },
        { headerName: "Name", field: "name", filter: true },
        { headerName: "Age", field: "age", filter: "agNumberColumnFilter" },
        { headerName: "Country", field: "country", filter: true }
    ]);

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="ag-grid-modal">
            <div style={{ width: "80%", height: "500px", background: "#fff", margin: "5% auto", padding: "20px", borderRadius: "10px" }}>
                <h2>AG Grid Data</h2>
                <div className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        pagination={true}
                        paginationPageSize={10}
                        defaultColDef={{ sortable: true, filter: true, resizable: true }}
                    />
                </div>
                <Button variant="contained" color="primary" onClick={handleClose} style={{ marginTop: "10px" }}>Close</Button>
            </div>
        </Modal>
    );
};

export default AgGridModal;