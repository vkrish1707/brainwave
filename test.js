import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  IconButton,
  TextField,
  Paper
} from '@mui/material';
import { Edit, Delete, Check } from '@mui/icons-material';
import './SourceSkillSet.css';

const SourceSkillSet = () => {
  const [skills, setSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editSkill, setEditSkill] = useState('');
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      const data = await response.json();
      const skillList = data.skills.map(item => item.SKILL_NAME);
      setSkills(skillList);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleEditSkill = (index) => {
    setEditIndex(index);
    setEditSkill(skills[index]);
  };

  const handleConfirmEditSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = editSkill;
    setSkills(updatedSkills);
    setEditIndex(null);
    setEditSkill('');
  };

  const handleDeleteSkill = (skill) => {
    setSkills(prev => prev.filter(s => s !== skill));
  };

  const filteredSkills = skills.filter(skill =>
    skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = () => {
    console.log('Saving updated skills:', skills);
    // Send skills to backend
  };

  return (
    <Paper elevation={5} className="source-skillset-paper">
      <Typography variant="h5" className="source-skillset-heading">
        Source and Skill List
      </Typography>
      <Box className="source-skillset-container">
        <Box className="source-skillset-section source-skillset-skill-set">
          <Typography variant="h6">Skills</Typography>
          <TextField
            fullWidth
            label="Search Skills"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            size="small"
            margin="normal"
          />
          <List className="source-skillset-skill-list">
            {filteredSkills.map((skill, index) => (
              <ListItem key={index}>
                {editIndex === index ? (
                  <TextField
                    value={editSkill}
                    onChange={(e) => setEditSkill(e.target.value)}
                    variant="standard"
                    size="small"
                    autoFocus
                  />
                ) : (
                  <>
                    {skill}
                    <IconButton edge="end" onClick={() => handleEditSkill(index)}>
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDeleteSkill(skill)}>
                      <Delete />
                    </IconButton>
                  </>
                )}
                {editIndex === index && (
                  <IconButton edge="end" onClick={() => handleConfirmEditSkill(index)}>
                    <Check />
                  </IconButton>
                )}
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
          <Button variant="outlined" onClick={handleSave} sx={{ mt: 2 }}>Save All</Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default SourceSkillSet;