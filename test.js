import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Button,
  Typography,
  FormControlLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ColorFilterAccordion = ({ onApply }) => {
  const [selectedColors, setSelectedColors] = useState({
    red: false,
    blue: false,
    green: false,
    yellow: false,
  });

  const handleColorChange = (color) => {
    setSelectedColors((prev) => ({ ...prev, [color]: !prev[color] }));
  };

  const handleApply = () => {
    // Call the onApply function and pass the selected colors
    onApply(selectedColors);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Filter by Color</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControlLabel
          control={<Checkbox checked={selectedColors.red} onChange={() => handleColorChange('red')} />}
          label="Red"
        />
        <FormControlLabel
          control={<Checkbox checked={selectedColors.blue} onChange={() => handleColorChange('blue')} />}
          label="Blue"
        />
        <FormControlLabel
          control={<Checkbox checked={selectedColors.green} onChange={() => handleColorChange('green')} />}
          label="Green"
        />
        <FormControlLabel
          control={<Checkbox checked={selectedColors.yellow} onChange={() => handleColorChange('yellow')} />}
          label="Yellow"
        />
        <Button variant="contained" color="primary" onClick={handleApply}>
          Apply
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default ColorFilterAccordion;