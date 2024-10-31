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