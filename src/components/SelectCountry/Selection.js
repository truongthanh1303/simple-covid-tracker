import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

function Selection({
  textForEmptyValue,
  label,
  selectionData,
  onChange,
  value
}) {
  const randomId = useRef(Math.round(Math.random() * 10));
  const [selectedItem, setSelectedItem] = useState('');
  function handleChange(evt) {
    setSelectedItem(evt.target.value);
    onChange(evt.target.value);
  }

  useEffect(() => {
    if (value && value !== selectedItem) {
      setSelectedItem(() => value);
    }
  }, [value, selectedItem]);

  return <>
    <FormControl variant="standard" fullWidth style={{ marginTop: 16 }}>
      <InputLabel id={`select-label-${randomId.current}`}>{label}</InputLabel>
      <Select
        labelId={`select-label-${randomId.current}`}
        id={`select-${randomId.current}`}
        value={selectedItem}
        defaultValue={''}
        label="Country"
        onChange={handleChange}
        inputProps={{ 'data-testid': `select-component-${label}` }}
      >
        <MenuItem value={''}>{textForEmptyValue}</MenuItem>
        {selectionData.map((entry, index) => (
          <MenuItem value={entry} key={index}>{entry}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </>
}

Selection.defaultProps = {
  textForEmptyValue: 'Empty value',
  label: 'Label',
  selectionData: [],
  onChange: () => {}
}

export default Selection;