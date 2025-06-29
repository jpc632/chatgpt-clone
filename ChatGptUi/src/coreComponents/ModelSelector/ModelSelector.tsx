import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material';

interface ModelSelectorProps {
  aiModel: string;
  handleChange: (event: SelectChangeEvent) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ aiModel, handleChange }) => {
  return (
    <div style={{marginRight: '20px'}}>
    <FormControl  variant="outlined" fullWidth style={{ minWidth: '120px' }}>
      <InputLabel id="my-select-label" style={{ color: '#a0aec0' }}>Model</InputLabel>
      <Select labelId="my-select-label" value={aiModel} onChange={handleChange} label="Option"
        sx={{
          color: '#ffffff',
          backgroundColor: '#2d3748',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: '#4a5568',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4299e1',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#718096',
          },
          '.MuiSvgIcon-root': {
            color: '#a0aec0',
          },
          '& .MuiSelect-icon': {
            color: '#a0aec0',
          },
        }}
      >
        <MenuItem value="gpt-3.5-turbo">gpt-3.5-turbo</MenuItem>
        <MenuItem value="gpt-4o-mini">gpt-4o-mini</MenuItem>
        <MenuItem value="gpt-4o">gpt-4o</MenuItem>
      </Select>
    </FormControl>
    </div>
  );
};