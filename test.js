import React, { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Select, Typography, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const EbvpHeader = ({ onFetchData }) => {
  const [hierarchy, setHierarchy] = useState({});
  const [week, setWeek] = useState('');
  const [node1Options, setNode1Options] = useState([]);
  const [node2Options, setNode2Options] = useState([]);
  const [node3Options, setNode3Options] = useState([]);

  const [selectedNode1, setSelectedNode1] = useState('');
  const [selectedNode2, setSelectedNode2] = useState('');
  const [selectedNode3, setSelectedNode3] = useState('');

  useEffect(() => {
    axios.get('/api/get-ebvp-hierarchy').then(res => {
      setHierarchy(res.data.hierarchy || {});
      setNode1Options(Object.keys(res.data.hierarchy || {}));
      setWeek(res.data.week);
    });
  }, []);

  const handleNode1Change = (value) => {
    setSelectedNode1(value);
    const node2s = hierarchy[value]?.node2List || [];
    setNode2Options(node2s);
    setSelectedNode2('');
    setSelectedNode3('');
    setNode3Options([]);
  };

  const handleNode2Change = (value) => {
    setSelectedNode2(value);
    const node3s = hierarchy[selectedNode1]?.children[value] || [];
    setNode3Options(node3s);
    setSelectedNode3('');
  };

  return (
    <Box display="flex" alignItems="center" gap={2} padding={2}>
      <Typography variant="h6">Week: {week}</Typography>

      <FormControl size="small" fullWidth>
        <InputLabel>EBVP Node 1</InputLabel>
        <Select value={selectedNode1} label="EBVP Node 1" onChange={(e) => handleNode1Change(e.target.value)}>
          {node1Options.map(n1 => <MenuItem key={n1} value={n1}>{n1}</MenuItem>)}
        </Select>
      </FormControl>

      <FormControl size="small" fullWidth>
        <InputLabel>EBVP Node 2</InputLabel>
        <Select value={selectedNode2} label="EBVP Node 2" onChange={(e) => handleNode2Change(e.target.value)} disabled={!selectedNode1}>
          {node2Options.map(n2 => <MenuItem key={n2} value={n2}>{n2}</MenuItem>)}
        </Select>
      </FormControl>

      <FormControl size="small" fullWidth>
        <InputLabel>EBVP Node 3</InputLabel>
        <Select value={selectedNode3} label="EBVP Node 3" onChange={(e) => setSelectedNode3(e.target.value)} disabled={!selectedNode2}>
          {node3Options.map(n3 => <MenuItem key={n3} value={n3}>{n3}</MenuItem>)}
        </Select>
      </FormControl>

      <Button variant="contained" onClick={() => onFetchData({ week, selectedNode1, selectedNode2, selectedNode3 })}>
        Get Data
      </Button>
    </Box>
  );
};

export default EbvpHeader;