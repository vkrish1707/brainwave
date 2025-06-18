const [hcTypeError, setHcTypeError] = useState(false);
const handleHcTypeChange = (e) => {
  const hcType = e.target.value;
  setSelectedHcType(hcType);

  if (hcType.length === 0) {
    setHcTypeError(true); // show red underline
  } else {
    setHcTypeError(false); // clear error
    fetchData(selectedWeek, hcType);
  }
};

<Select
  value={selectedHcType}
  multiple
  error={hcTypeError}
  onChange={handleHcTypeChange}
  renderValue={(selected) => selected.join(', ')}
  input={<OutlinedInput label="HC Type" />}
>
  {hcTypes.map((name) => (
    <MenuItem key={name} value={name}>
      <Checkbox checked={selectedHcType.includes(name)} />
      <ListItemText primary={name} />
    </MenuItem>
  ))}
</Select>
{hcTypeError && (
  <FormHelperText sx={{ color: 'red' }}>
    At least one HC Type must be selected.
  </FormHelperText>
)}