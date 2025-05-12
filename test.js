import React, { useState, useEffect, useRef } from 'react';
import { Select, MenuItem, FormControl } from '@mui/material';

const SkillCellRenderer = (props) => {
    const { value, data, api, colDef } = props;
    const options = colDef.cellRendererParams?.options || [];

    const [editing, setEditing] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || '');
    const [openDropdown, setOpenDropdown] = useState(false);

    const containerRef = useRef(null);

    const handleSelectChange = (e) => {
        const newValue = e.target.value;
        setSelectedValue(newValue);
        api.applyTransaction({
            update: [{ ...data, SKILL_SET: newValue }],
        });
        setEditing(false);
        setOpenDropdown(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                if (editing) {
                    setEditing(false);
                    setOpenDropdown(false);
                }
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [editing]);

    useEffect(() => {
        // Sync selectedValue when props.value changes
        if (props.value !== selectedValue) {
            setSelectedValue(props.value || '');
        }
    }, [props.value]);

    return (
        <div
            ref={containerRef}
            onClick={() => {
                setEditing(true);
                setOpenDropdown(true);
            }}
            style={{ width: '100%', cursor: 'pointer' }}
        >
            {editing ? (
                <FormControl fullWidth size="small">
                    <Select
                        value={selectedValue}
                        onChange={handleSelectChange}
                        open={openDropdown}
                        onClose={() => {
                            setEditing(false);
                            setOpenDropdown(false);
                        }}
                        autoFocus
                        displayEmpty
                        fullWidth
                        variant="standard"
                        disableUnderline
                    >
                        <MenuItem disabled value="">
                            <em>Select skill</em>
                        </MenuItem>
                        {options.map((skill) => (
                            <MenuItem key={skill} value={skill}>
                                {skill}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : (
                <span>{selectedValue || 'Select skill'}</span>
            )}
        </div>
    );
};

export default SkillCellRenderer;