const SkillCellRenderer = (props) => {
    const [editing, setEditing] = useState(false);
    const [selectedValue, setSelectedValue] = useState(props.value);

    const handleSelectChange = (e) => {
        const newValue = e.target.value;
        setSelectedValue(newValue);
        setEditing(false);

        // Update AG Grid row
        props.api.applyTransaction({
            update: [{ ...props.data, SKILL_SET: newValue }]
        });

        // Optionally trigger backend
        callBackendUpdate({
            employeeId: props.data.EMPLOYEE_ID,
            workWeek: props.data.WEEK_NUM,
            newValue: newValue
        });
    };

    return (
        <div onClick={() => setEditing(true)} style={{ cursor: 'pointer' }}>
            {editing ? (
                <select value={selectedValue} onChange={handleSelectChange} autoFocus>
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                    <option value="C++">C++</option>
                </select>
            ) : (
                <span>{selectedValue || 'Select skill'}</span>
            )}
        </div>
    );
};