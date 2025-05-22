import React from 'react';
import { TextField, Button, Box, FormHelperText } from '@mui/material';

interface UsdInputProps {
  value: string;
  onChange: (value: string) => void;
}

const defaultValues = ["100", "500", "1000", "10000"];

const UsdInput: React.FC<UsdInputProps> = ({ value, onChange }) => {
  const isInvalid = !value || isNaN(Number(value)) || Number(value) < 0;
  return (
    <Box>
      <TextField
        fullWidth
        label="USD Amount"
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        inputProps={{ min: '0', step: '1' }}
        sx={{ mb: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#333',
            },
            '&:hover fieldset': {
              borderColor: '#444',
            },
          },
        }}
        error={isInvalid}
      />
      {isInvalid && (
        <FormHelperText error sx={{ mb: 1 }}>
          Input is invalid. Amount must be a positive number.
        </FormHelperText>
      )}
      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
        {defaultValues.map(val => (
          <Button
            key={val}
            variant="outlined"
            color="primary"
            onClick={() => onChange(val)}
            sx={{ minWidth: 0, px: 2 }}
          >
            {`$${val}`}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default UsdInput; 