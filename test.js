import React, { useEffect, useState } from 'react';
import {
  Box, Button, Typography, List, ListItem, TextField, Paper,
  IconButton
} from '@mui/material';
import { Add, Delete, Save, Edit, Check } from '@mui/icons-material';
import './SourceSkillSet.css';

const SourceSkillSet = () => {
  const [skills, setSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editSkill, setEditSkill] = useState('');

  useEffect(() => {
    fetch('/api/skills') // replace with your actual API endpoint
      .then(res => res.json())
      .then(data => {
        const skillList = data.skills.map(s => s.SKILL_NAME);
        setSkills(skillList);
      });
  }, []);

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    setSkills(prev => [...prev, newSkill]);
    setNewSkill('');
  };

  const handleDeleteSkill = (skill) => {
    setSkills(prev => prev.filter(s => s !== skill));
  };

  const handleEditSkill = (index) => {
    setEditIndex(index);
    setEditSkill(filteredSkills[index]);
  };

  const handleConfirmEditSkill = (index) => {
    const updatedSkills = [...skills];
    const originalSkillIndex = skills.indexOf(filteredSkills[index]);
    if (originalSkillIndex > -1) {
      updatedSkills[originalSkillIndex] = editSkill;
      setSkills(updatedSkills);
    }
    setEditIndex(null);
    setEditSkill('');
  };

  const handleSave = () => {
    console.log('Final Payload:', { source: 'global', skills });
    // Call backend API to save
  };

  const filteredSkills = skills.filter(skill =>
    skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Paper elevation={5} className="source-skillset-paper">
      <Typography variant="h5" className="source-skillset-heading">
        Source and Skill List
      </Typography>

      <Box className="source-skillset-container">
        <Box className="source-skillset-section source-skillset-source-list">
          <Typography variant="h6">Source Lists</Typography>
          <List>
            <ListItem selected>Global</ListItem>
          </List>
        </Box>

        <Box className="source-skillset-section source-skillset-skill-set">
          <Typography variant="h6">Skills</Typography>
          <TextField
            label="Search Skills"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          />
          <List className="source-skillset-skill-list">
            {filteredSkills.map((skill, index) => (
              <ListItem key={index}
                secondaryAction={
                  editIndex === index ? (
                    <IconButton edge="end" onClick={() => handleConfirmEditSkill(index)}><Check /></IconButton>
                  ) : (
                    <>
                      <IconButton edge="end" onClick={() => handleEditSkill(index)}><Edit /></IconButton>
                      <IconButton edge="end" onClick={() => handleDeleteSkill(skill)}><Delete /></IconButton>
                    </>
                  )
                }
              >
                {editIndex === index ? (
                  <TextField
                    value={editSkill}
                    onChange={(e) => setEditSkill(e.target.value)}
                    variant="standard"
                    size="small"
                    autoFocus
                  />
                ) : skill}
              </ListItem>
            ))}
          </List>
          <Box display="flex" gap={1} mt={2}>
            <TextField
              label="New Skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
            />
            <Button variant="contained" onClick={handleAddSkill}>Add</Button>
          </Box>
          <Button variant="outlined" startIcon={<Save />} onClick={handleSave} sx={{ mt: 3 }}>
            Save All
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default SourceSkillSet;