import React, { useState, useEffect } from 'react';
import { Box, Button, MenuItem, Select, Typography } from '@mui/material';

const EvpHeader = ({ hierarchy, weeks, latestWeek, onGetData }) => {
  const [selectedWeek, setSelectedWeek] = useState(latestWeek || '');
  const [selectedNode1, setSelectedNode1] = useState('');
  const [selectedNode2, setSelectedNode2] = useState('');
  const [selectedNode3, setSelectedNode3] = useState('');

  const node1List = Object.keys(hierarchy || {});
  const node2List = selectedNode1 ? hierarchy[selectedNode1]?.node2List || [] : [];
  const node3List = selectedNode1 && selectedNode2 ? hierarchy[selectedNode1]?.children[selectedNode2] || [] : [];

  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.value);
  };

  const handleNode1Change = (e) => {
    setSelectedNode1(e.target.value);
    setSelectedNode2('');
    setSelectedNode3('');
  };

  const handleNode2Change = (e) => {
    setSelectedNode2(e.target.value);
    setSelectedNode3('');
  };

  const handleNode3Change = (e) => {
    setSelectedNode3(e.target.value);
  };

  const canFetch = selectedWeek && selectedNode1 && selectedNode2 && (!node3List.length || selectedNode3);

  return (
    <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
      <Typography variant="h6">EVP Filter</Typography>

      <Select value={selectedWeek} onChange={handleWeekChange} displayEmpty size="small">
        <MenuItem value="" disabled>Select Week</MenuItem>
        {weeks.map((w) => (
          <MenuItem key={w} value={w}>{w}</MenuItem>
        ))}
      </Select>

      <Select value={selectedNode1} onChange={handleNode1Change} displayEmpty size="small">
        <MenuItem value="" disabled>Select Node 1</MenuItem>
        {node1List.map((n1) => (
          <MenuItem key={n1} value={n1}>{n1}</MenuItem>
        ))}
      </Select>

      {node2List.length > 0 && (
        <Select value={selectedNode2} onChange={handleNode2Change} displayEmpty size="small">
          <MenuItem value="" disabled>Select Node 2</MenuItem>
          {node2List.map((n2) => (
            <MenuItem key={n2} value={n2}>{n2}</MenuItem>
          ))}
        </Select>
      )}

      {node3List.length > 0 && (
        <Select value={selectedNode3} onChange={handleNode3Change} displayEmpty size="small">
          <MenuItem value="" disabled>Select Node 3</MenuItem>
          {node3List.map((n3) => (
            <MenuItem key={n3} value={n3}>{n3}</MenuItem>
          ))}
        </Select>
      )}

      <Button variant="contained" onClick={() => onGetData({ selectedWeek, selectedNode1, selectedNode2, selectedNode3 })} disabled={!canFetch}>
        Get Data
      </Button>
    </Box>
  );
};

export default EvpHeader;
