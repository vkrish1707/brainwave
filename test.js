.ebvp-header {
  color: white;
  margin-top: -15px;
}

.ebvp-header .MuiFormControl-root {
  background-color: #1f2937;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  padding: 6px 12px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.ebvp-header .MuiFormControl-root:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.7);
  transform: translateY(-2px);
}

.ebvp-header .MuiInputBase-root,
.ebvp-header .MuiInputLabel-root,
.ebvp-header .MuiSelect-select,
.ebvp-header .MuiMenuItem-root,
.ebvp-header .MuiSvgIcon-root {
  color: white;
}

.ebvp-header .MuiOutlinedInput-notchedOutline {
  border-color: #959595;
}

.ebvp-dropdown-menu {
  background-color: #161B22 !important;
  color: white;
}

<Select
  value={selectedNode1}
  label="EBVP Top Node"
  onChange={(e) => handleNode1Change(e.target.value)}
  MenuProps={{
    PaperProps: {
      className: 'ebvp-dropdown-menu',
    },
  }}
>
