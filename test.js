import React, { useState } from "react";
import { Button } from "@mui/material";
import AgGridModal from "./AgGridModal";

const ParentComponent = () => {
    const [open, setOpen] = useState(false);
    const rowData = [
        { id: 1, name: "John Doe", age: 30, country: "USA" },
        { id: 2, name: "Jane Smith", age: 25, country: "Canada" },
        { id: 3, name: "Alice Johnson", age: 35, country: "UK" }
    ];

    return (
        <div>
            <Button variant="contained" onClick={() => setOpen(true)}>Open AG Grid</Button>
            <AgGridModal open={open} handleClose={() => setOpen(false)} rowData={rowData} />
        </div>
    );
};

export default ParentComponent;