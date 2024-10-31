import React, { useState } from 'react';
import { Button, Box, Typography, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Search } from '@mui/icons-material';
import axios from 'axios';

const initialData = [
  { sid: 'SID001', name: 'Item 1' },
  { sid: 'SID002', name: 'Item 2' },
  { sid: 'SID003', name: 'Item 3' },
];

const AdminPanel = () => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [items, setItems] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      try {
        // Replace 'your-search-api-endpoint' with the actual API endpoint
        const response = await axios.get(`your-search-api-endpoint?q=${query}`);
        const apiResults = response.data;
        
        // Check if items from API are already in the list
        const updatedResults = apiResults.map((result) => ({
          ...result,
          alreadyAdded: items.some((item) => item.sid === result.sid),
        }));
        setSearchResults(updatedResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const addItem = (item) => {
    setItems([...items, item]);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div>
      <Button onClick={togglePanel} variant="contained" color="primary">
        {isPanelVisible ? 'Hide Admin Panel' : 'Show Admin Panel'}
      </Button>
      {isPanelVisible && (
        <Box sx={{ display: 'flex', p: 2, mt: 2, border: '1px solid #ddd', borderRadius: '8px' }}>
          <Box sx={{ flex: 3 }}>
            <Typography variant="h6" gutterBottom>
              Drag and Drop List
            </Typography>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <List {...provided.droppableProps} ref={provided.innerRef}>
                    {items.map((item, index) => (
                      <Draggable key={item.sid} draggableId={item.sid} index={index}>
                        {(provided) => (
                          <ListItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{ mb: 1, border: '1px solid #ddd', borderRadius: '4px' }}
                          >
                            <ListItemText
                              primary={<Typography variant="h6">{item.name}</Typography>}
                              secondary={<Typography variant="body2">{item.sid}</Typography>}
                            />
                          </ListItem>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </DragDropContext>
          </Box>

          <Box sx={{ flex: 1, ml: 2 }}>
            <Typography variant="h6" gutterBottom>
              Search and Add Items
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Search by SID"
              value={searchQuery}
              onChange={handleSearch}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <Search />
                  </IconButton>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <List>
              {searchResults.map((result) => (
                <ListItem
                  key={result.sid}
                  button
                  onClick={() => !result.alreadyAdded && addItem(result)}
                  sx={{
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    mb: 1,
                    opacity: result.alreadyAdded ? 0.5 : 1,
                    cursor: result.alreadyAdded ? 'not-allowed' : 'pointer',
                  }}
                >
                  <ListItemText
                    primary={<Typography variant="body1">{result.name}</Typography>}
                    secondary={
                      result.alreadyAdded ? (
                        <Typography variant="body2" color="textSecondary">
                          {result.sid} (Already Added)
                        </Typography>
                      ) : (
                        <Typography variant="body2">{result.sid}</Typography>
                      )
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AdminPanel;


import React, { useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import Slider from "@mui/material/Slider";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const MyGridComponent = () => {
  const gridRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [gridWidth, setGridWidth] = useState(800);
  const [gridHeight, setGridHeight] = useState(400);
  const [maxWidth, setMaxWidth] = useState(window.innerWidth);

  // Update maxWidth based on viewport width
  useEffect(() => {
    const handleResize = () => {
      setMaxWidth(window.innerWidth - 50); // Subtract 50px for padding/margin if needed
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update width and zoom simultaneously
  const handleZoomChange = (event, newValue) => {
    setZoomLevel(newValue);
  };

  const handleWidthChange = (event, newValue) => {
    setGridWidth(Math.min(newValue, maxWidth));
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        <h3>Zoom Level</h3>
        <Slider
          value={zoomLevel}
          min={0.5}
          max={2}
          step={0.1}
          onChange={handleZoomChange}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <h3>Grid Width</h3>
        <Slider
          value={gridWidth}
          min={500}
          max={maxWidth}
          step={10}
          onChange={handleWidthChange}
        />
      </div>

      <div
        id="gridDiv"
        className="ag-theme-alpine"
        style={{
          width: `${gridWidth}px`,
          height: `${gridHeight}px`,
          transform: `scale(${zoomLevel})`,
          transformOrigin: "top left",
        }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={[{ col1: "Row 1", col2: "Data" }, { col1: "Row 2", col2: "More Data" }]}
          columnDefs={[{ headerName: "Column 1", field: "col1" }, { headerName: "Column 2", field: "col2" }]}
        />
      </div>
    </div>
  );
};

export default MyGridComponent;

