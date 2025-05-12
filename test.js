import React, { useState, useEffect, useRef } from 'react';
import { Select, MenuItem } from '@mui/material';

const SkillCellRenderer = (props) => {
    const { value, data, api, colDef } = props;
    const [editing, setEditing] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || '');
    const selectRef = useRef(null);

    const options = colDef.cellRendererParams?.options || [];

    useEffect(() => {
        if (editing && selectRef.current) {
            // Automatically open the dropdown
            selectRef.current.focus();
            selectRef.current.click(); // forces the dropdown to open
        }
    }, [editing]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setSelectedValue(newValue);
        setEditing(false);

        // Update AG Grid row
        api.applyTransaction({
            update: [{ ...data, SKILL_SET: newValue }]
        });

        // Backend update (optional)
        if (colDef.cellRendererParams?.onChange) {
            colDef.cellRendererParams.onChange(newValue, data);
        }
    };

    return (
        <div onClick={() => setEditing(true)} style={{ width: '100%', height: '100%' }}>
            {editing ? (
                <Select
                    ref={selectRef}
                    value={selectedValue}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    variant="standard"
                    disableUnderline
                >
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            ) : (
                <span>{selectedValue || 'Select skill'}</span>
            )}
        </div>
    );
};

export default SkillCellRenderer;