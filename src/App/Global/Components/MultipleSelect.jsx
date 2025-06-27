import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SingleSelect({ values, placeholder, value, onChange, disabled, defaultValue }) {
  const [safed, setSafed] = React.useState(value || '');

  React.useEffect(() => {
  if (value !== safed) {
    setSafed(value || '');
  }
}, [value]);

  const handleChange = (event) => {
    setSafed(event.target.value);
    if (onChange) onChange(event.target.value);
  };

  return (
    <Box>
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={safed}
          defaultValue={defaultValue}
          label={placeholder}
          onChange={handleChange}
          disabled={disabled}
        >
          {values.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
